import json
from pathlib import Path

DATA_FILE = Path(__file__).parent.parent / "data" / "countries.json"


def load_countries():
    with open(DATA_FILE, "r", encoding="utf-8") as file:
        return json.load(file)


def get_country_list():
    countries = load_countries()

    result = []

    for code, info in countries.items():
        result.append({
            "code": code,
            "country": info["country"],
            "currency": info["currency"],
            "symbol": info["symbol"],
            "flag": info["flag"],
            "continent": info["continent"]
        })

    return sorted(result, key=lambda x: x["country"])


# ⬇️ PASTE THE NEW FUNCTION HERE
def search_countries(query: str):
    countries = load_countries()

    query = query.lower()

    results = []

    for code, info in countries.items():
        if (
            query in code.lower()
            or query in info["country"].lower()
            or query in info["currency"].lower()
        ):
            results.append({
                "code": code,
                "country": info["country"],
                "currency": info["currency"],
                "symbol": info["symbol"],
                "flag": info["flag"],
                "continent": info["continent"]
            })

    return sorted(results, key=lambda x: x["country"])