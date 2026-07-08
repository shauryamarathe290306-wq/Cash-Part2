def convert_currency(amount: float, rate: float) -> float:
    """
    Convert currency using the given exchange rate.
    """
    return round(amount * rate, 2)