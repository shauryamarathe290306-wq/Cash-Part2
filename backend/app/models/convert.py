from pydantic import BaseModel


class ConvertRequest(BaseModel):
    amount: float
    rate: float