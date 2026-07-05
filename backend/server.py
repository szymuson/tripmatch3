from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from starlette.concurrency import run_in_threadpool
from motor.motor_asyncio import AsyncIOMotorClient
import os
import json
import logging
import unicodedata
import requests
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import Any, Dict, List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

UNSPLASH_CACHE_PATH = ROOT_DIR / "data" / "unsplash-image-cache.json"


def _empty_unsplash_cache() -> Dict[str, Any]:
    return {"version": 1, "images": {}}


def _load_unsplash_cache() -> Dict[str, Any]:
    if not UNSPLASH_CACHE_PATH.exists():
        return _empty_unsplash_cache()

    with UNSPLASH_CACHE_PATH.open("r", encoding="utf-8") as cache_file:
        data = json.load(cache_file)

    if not isinstance(data, dict):
        return _empty_unsplash_cache()

    data.setdefault("version", 1)
    data.setdefault("images", {})
    return data


def _save_unsplash_cache(cache: Dict[str, Any]) -> None:
    UNSPLASH_CACHE_PATH.parent.mkdir(parents=True, exist_ok=True)
    temp_path = UNSPLASH_CACHE_PATH.with_suffix(".tmp")
    with temp_path.open("w", encoding="utf-8") as cache_file:
        json.dump(cache, cache_file, ensure_ascii=False, indent=2)
        cache_file.write("\n")
    temp_path.replace(UNSPLASH_CACHE_PATH)


def _normalize_text(value: Any) -> str:
    normalized = unicodedata.normalize("NFD", str(value or ""))
    return "".join(char for char in normalized if unicodedata.category(char) != "Mn").lower()


def _photo_search_text(photo: Dict[str, Any]) -> str:
    tags = photo.get("tags") or []
    topics = photo.get("topic_submissions") or {}
    user = photo.get("user") or {}
    location = photo.get("location") or {}
    parts = [
        photo.get("alt_description"),
        photo.get("description"),
        photo.get("slug"),
        location.get("name"),
        user.get("name"),
        user.get("username"),
        *[tag.get("title") for tag in tags if isinstance(tag, dict)],
        *[topic.get("title") for topic in topics.values() if isinstance(topic, dict)],
    ]
    return _normalize_text(" ".join([str(part) for part in parts if part]))


def _has_term(text: str, term: Any) -> bool:
    return _normalize_text(term) in text


def _parse_selector(selector: Optional[str]) -> Dict[str, List[str]]:
    if not selector:
        return {"required": [], "preferred": [], "rejected": []}

    try:
        parsed = json.loads(selector)
    except json.JSONDecodeError:
        return {"required": [], "preferred": [], "rejected": []}

    if not isinstance(parsed, dict):
        return {"required": [], "preferred": [], "rejected": []}

    return {
        "required": [str(item) for item in parsed.get("required", []) if item],
        "preferred": [str(item) for item in parsed.get("preferred", []) if item],
        "rejected": [str(item) for item in parsed.get("rejected", []) if item],
    }


def _choose_unsplash_photo(
    photos: List[Dict[str, Any]],
    selector: Dict[str, List[str]],
    target_ratio: Optional[float] = None,
) -> Optional[Dict[str, Any]]:
    if not photos:
        return None

    if not any(selector.values()) and not target_ratio:
        return photos[0]

    scored = []
    for index, photo in enumerate(photos):
        text = _photo_search_text(photo)
        required = selector["required"]
        preferred = selector["preferred"]
        rejected = selector["rejected"]
        required_misses = len([term for term in required if not _has_term(text, term)])
        required_hits = len(required) - required_misses
        preferred_hits = len([term for term in preferred if _has_term(text, term)])
        rejected_hits = len([term for term in rejected if _has_term(text, term)])

        width = photo.get("width") or 0
        height = photo.get("height") or 0
        ratio = width / height if width and height else target_ratio or 1.4
        if target_ratio:
            ratio_distance = abs(ratio - target_ratio) / target_ratio
            ratio_score = max(14 - ratio_distance * 70, -35)
        else:
            ratio_score = 3 if 1.05 <= ratio <= 1.9 else -2
        score = (
            required_hits * 18
            + preferred_hits * 5
            + ratio_score
            - required_misses * 22
            - rejected_hits * 28
            - index * 0.2
        )
        scored.append((score, photo))

    scored.sort(key=lambda item: item[0], reverse=True)
    return scored[0][1] if scored[0][0] > -10 else photos[0]


def _serialize_unsplash_photo(
    photo: Dict[str, Any],
    query: str,
    target_width: Optional[int] = None,
    target_height: Optional[int] = None,
) -> Dict[str, Any]:
    user = photo.get("user") or {}
    user_links = user.get("links") or {}
    links = photo.get("links") or {}
    urls = photo.get("urls") or {}

    return {
        "provider": "unsplash",
        "id": photo.get("id"),
        "query": query,
        "cachedAt": datetime.now(timezone.utc).isoformat(),
        "target": {
            "width": target_width,
            "height": target_height,
            "ratio": (target_width / target_height) if target_width and target_height else None,
        },
        "width": photo.get("width"),
        "height": photo.get("height"),
        "color": photo.get("color"),
        "blur_hash": photo.get("blur_hash"),
        "alt_description": photo.get("alt_description"),
        "description": photo.get("description"),
        "urls": {
            "raw": urls.get("raw"),
            "regular": urls.get("regular"),
            "small": urls.get("small"),
            "thumb": urls.get("thumb"),
        },
        "links": {
            "html": links.get("html"),
            "download_location": links.get("download_location"),
        },
        "user": {
            "name": user.get("name"),
            "username": user.get("username"),
            "links": {
                "html": user_links.get("html"),
            },
        },
    }


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

@api_router.get("/unsplash/image")
async def resolve_unsplash_image(
    key: str = Query(..., min_length=2, max_length=180),
    query: str = Query(..., min_length=2, max_length=160),
    per_page: int = Query(1, ge=1, le=12),
    orientation: str = Query("landscape", pattern="^(landscape|portrait|squarish)$"),
    content_filter: str = Query("high", pattern="^(low|high)$"),
    selector: Optional[str] = Query(None, max_length=1600),
    target_width: Optional[int] = Query(None, ge=100, le=4000),
    target_height: Optional[int] = Query(None, ge=100, le=4000),
    refresh: bool = Query(False),
):
    cache = await run_in_threadpool(_load_unsplash_cache)
    cached_photo = cache.get("images", {}).get(key)

    if cached_photo and not refresh:
        return {"source": "cache", "key": key, "photo": cached_photo}

    access_key = os.environ.get("UNSPLASH_ACCESS_KEY")
    if not access_key:
        if cached_photo:
            return {"source": "cache", "key": key, "photo": cached_photo}
        raise HTTPException(status_code=503, detail="Unsplash API is not configured")

    parsed_selector = _parse_selector(selector)

    def fetch_unsplash():
        return requests.get(
            "https://api.unsplash.com/search/photos",
            params={
                "query": query,
                "per_page": per_page,
                "orientation": orientation,
                "content_filter": content_filter,
            },
            headers={
                "Authorization": f"Client-ID {access_key}",
                "Accept-Version": "v1",
            },
            timeout=8,
        )

    response = await run_in_threadpool(fetch_unsplash)
    if not response.ok:
        if cached_photo:
            return {"source": "cache", "key": key, "photo": cached_photo}
        raise HTTPException(status_code=response.status_code, detail="Unsplash request failed")

    data = response.json()
    target_ratio = (target_width / target_height) if target_width and target_height else None
    selected_photo = _choose_unsplash_photo(data.get("results") or [], parsed_selector, target_ratio)
    if not selected_photo:
        if cached_photo:
            return {"source": "cache", "key": key, "photo": cached_photo}
        raise HTTPException(status_code=404, detail="No Unsplash image found")

    serialized_photo = _serialize_unsplash_photo(selected_photo, query, target_width, target_height)
    cache.setdefault("version", 1)
    cache.setdefault("images", {})
    cache["images"][key] = serialized_photo
    await run_in_threadpool(_save_unsplash_cache, cache)

    return {"source": "unsplash", "key": key, "photo": serialized_photo}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
