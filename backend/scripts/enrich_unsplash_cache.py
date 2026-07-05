import argparse
import json
import time
from pathlib import Path

import requests


DEFAULT_TARGETS_PATH = Path(__file__).resolve().parents[1] / "data" / "unsplash-enrichment-targets.json"


def load_targets(path):
    with Path(path).open("r", encoding="utf-8") as target_file:
        data = json.load(target_file)
    return data.get("targets", data)


def enrich_target(base_url, target, refresh):
    params = {
        "key": target["key"],
        "query": target["query"],
        "per_page": target.get("per_page", 6),
        "orientation": target.get("orientation", "landscape"),
        "content_filter": target.get("content_filter", "high"),
        "target_width": target.get("target_width"),
        "target_height": target.get("target_height"),
    }

    if target.get("selector"):
        params["selector"] = json.dumps(target["selector"])
    if refresh:
        params["refresh"] = "true"
    params = {key: value for key, value in params.items() if value is not None}

    response = requests.get(f"{base_url.rstrip('/')}/api/unsplash/image", params=params, timeout=20)
    response.raise_for_status()
    return response.json()


def main():
    parser = argparse.ArgumentParser(description="Populate the local Unsplash image metadata cache.")
    parser.add_argument("--base-url", default="http://127.0.0.1:8001", help="Running backend URL.")
    parser.add_argument("--targets", default=str(DEFAULT_TARGETS_PATH), help="JSON file with enrichment targets.")
    parser.add_argument("--refresh", action="store_true", help="Refresh existing cached entries.")
    parser.add_argument("--delay", type=float, default=1.0, help="Delay between requests, in seconds.")
    args = parser.parse_args()

    for target in load_targets(args.targets):
        result = enrich_target(args.base_url, target, args.refresh)
        photo = result.get("photo") or {}
        print(f"{target['key']}: {result.get('source')} / {photo.get('id')}")
        time.sleep(args.delay)


if __name__ == "__main__":
    main()
