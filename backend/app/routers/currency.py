from fastapi import APIRouter
from app.models.currency import ConvertRequest, ConvertResponse
from app.services.country_service import (
    get_country_list,
    search_countries
)
from app.services.exchange_service import convert_currency

router = APIRouter(prefix="/currencies", tags=["Currencies"])


@router.get("/")
def get_currencies():
    return get_country_list()


@router.get("/search")
def search(query: str):
    return search_countries(query)


@router.post("/convert", response_model=ConvertResponse)
def convert(data: ConvertRequest):
    return convert_currency(
        data.from_currency,
        data.to_currency,
        data.amount
    )