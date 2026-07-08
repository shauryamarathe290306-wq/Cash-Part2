from fastapi import APIRouter

from app.models.convert import ConvertRequest
from app.services.converter import convert_currency

router = APIRouter(prefix="/currencies", tags=["Currencies"])

currencies = [
    {"code": "USD", "name": "United States Dollar"},
    {"code": "INR", "name": "Indian Rupee"},
    {"code": "EUR", "name": "Euro"},
    {"code": "GBP", "name": "British Pound"},
    {"code": "JPY", "name": "Japanese Yen"},
]


@router.get("/")
def get_currencies():
    return currencies


@router.post("/convert")
def convert(data: ConvertRequest):
    result = convert_currency(data.amount, data.rate)

    return {
        "amount": data.amount,
        "rate": data.rate,
        "converted_amount": result
    }