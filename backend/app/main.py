from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import currency

app = FastAPI(
    title="CurrencyVerse API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(currency.router)

@app.get("/")
def root():
    return {
        "message": "Welcome to CurrencyVerse API 🚀"
    }

@app.get("/health")
def health():
    return {
        "status": "Backend is running!",
        "project": "CurrencyVerse"
    }