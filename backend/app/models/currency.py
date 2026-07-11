from pydantic import BaseModel


class ConvertRequest(BaseModel):
    from_currency: str
    to_currency: str
    amount: float


class ConvertResponse(BaseModel):
    from_currency: str
    to_currency: str
    amount: float
    rate: float
    result: float