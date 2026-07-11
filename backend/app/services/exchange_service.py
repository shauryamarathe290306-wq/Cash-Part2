import requests

API_URL = "https://open.er-api.com/v6/latest/"


def get_exchange_rates(base_currency: str):
    """
    Fetch latest exchange rates for the given base currency.
    """
    response = requests.get(API_URL + base_currency.upper(), timeout=10)

    if response.status_code != 200:
        return None

    data = response.json()

    if data.get("result") != "success":
        return None

    return data["rates"]


def convert_currency(from_currency: str, to_currency: str, amount: float):
    """
    Convert amount between two currencies using live exchange rates.
    """

    rates = get_exchange_rates(from_currency)

    if rates is None:
        return {
            "error": "Unable to fetch exchange rates."
        }

    to_currency = to_currency.upper()

    if to_currency not in rates:
        return {
            "error": f"Currency '{to_currency}' not supported."
        }

    converted_amount = amount * rates[to_currency]

    return {
    "from_currency": from_currency.upper(),
    "to_currency": to_currency,
    "amount": amount,
    "rate": rates[to_currency],
    "result": round(converted_amount, 2)
}