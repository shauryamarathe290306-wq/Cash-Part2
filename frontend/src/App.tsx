import { useState } from "react";
import SearchDropdown from "./components/SearchDropdown";
import { countryInfo } from "./data/countryInfo";

function App() {
  const [amount, setAmount] = useState("");

  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");

  const [fromDisplay, setFromDisplay] = useState("United States");
  const [toDisplay, setToDisplay] = useState("India");

  const [result, setResult] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  
const fromInfo =
  countryInfo[fromCurrency as keyof typeof countryInfo];

const toInfo =
  countryInfo[toCurrency as keyof typeof countryInfo];
  const handleConvert = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/currencies/convert",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from_currency: fromCurrency,
            to_currency: toCurrency,
            amount: Number(amount),
          }),
        }
      );

      const data = await response.json();

      if (data.result !== undefined) {
        setResult(Number(data.result).toLocaleString("en-IN"));

        setExchangeRate(
          `1 ${fromCurrency} = ${Number(data.rate).toLocaleString(
            "en-IN"
          )} ${toCurrency}`
        );

        setLastUpdated(new Date().toLocaleString());
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Unable to connect to backend.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e293b,#111827)",
        padding: "50px 20px",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: "520px",
          margin: "auto",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "56px",
            marginBottom: "30px",
          }}
        >
          🌍 CurrencyVerse
        </h1>

        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            marginBottom: "20px",
            fontSize: "18px",
          }}
        />

        <SearchDropdown
          label="From Currency"
          value={fromCurrency}
          displayValue={fromDisplay}
          onInputChange={setFromDisplay}
          onSelect={(code, display) => {
            setFromCurrency(code);
            setFromDisplay(display);
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "18px 0",
          }}
        >
          <button
            onClick={() => {
              const tempCode = fromCurrency;
              setFromCurrency(toCurrency);
              setToCurrency(tempCode);

              const tempDisplay = fromDisplay;
              setFromDisplay(toDisplay);
              setToDisplay(tempDisplay);
            }}
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              border: "none",
              fontSize: "28px",
              cursor: "pointer",
              background: "#2563eb",
              color: "white",
              transition: "0.3s",
              boxShadow: "0 0 20px rgba(37,99,235,.4)",
            }}
          >
            ⇅
          </button>
        </div>

        <SearchDropdown
          label="To Currency"
          value={toCurrency}
          displayValue={toDisplay}
          onInputChange={setToDisplay}
          onSelect={(code, display) => {
            setToCurrency(code);
            setToDisplay(display);
          }}
        />

        <button
          onClick={handleConvert}
          style={{
            width: "100%",
            padding: "15px",
            marginTop: "20px",
            borderRadius: "10px",
            cursor: "pointer",
            border: "none",
            background: "#22c55e",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            transition: "0.3s",
          }}
        >
          Convert
        </button>

        <div
          style={{
            marginTop: "35px",
            padding: "25px",
            borderRadius: "18px",
            textAlign: "center",
            color: "white",
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,.15)",
            boxShadow: "0 8px 30px rgba(0,0,0,.35)",
          }}
        >
          <h3
            style={{
              color: "#22c55e",
              fontSize: "28px",
            }}
          >
            ✅ Conversion Result
          </h3>

          <p
            style={{
              fontSize: "20px",
            }}
          >
            {Number(amount || 0).toLocaleString("en-IN")} {fromCurrency}
          </p>

          <div
            style={{
              fontSize: "36px",
              margin: "12px 0",
            }}
          >
            ↓
          </div>

          <h2
            style={{
              fontSize: "42px",
              margin: 0,
              color: "#60a5fa",
            }}
          >
            {result} {toCurrency}
          </h2>

          <hr
            style={{
              margin: "25px 0",
              borderColor: "#555",
            }}
          />

          <p
            style={{
              color: "#ccc",
            }}
          >
            Exchange Rate
          </p>

          <h3>{exchangeRate}</h3>

          <hr
            style={{
              margin: "25px 0",
              borderColor: "#555",
            }}
          />

          <p
            style={{
              color: "#ccc",
            }}
          >
            Last Updated
          </p>

          <p>{lastUpdated}</p>
          <div
  style={{
    display: "flex",
    gap: "20px",
    marginTop: "30px",
    flexWrap: "wrap",
    justifyContent: "center",
  }}
>
  {/* FROM COUNTRY */}
  <div
    style={{
      flex: "1",
      minWidth: "220px",
      background: "rgba(255,255,255,0.08)",
      backdropFilter: "blur(12px)",
      borderRadius: "15px",
      padding: "20px",
      border: "1px solid rgba(255,255,255,0.15)",
      boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
    }}
  >
    <h2 style={{ textAlign: "center" }}>
      {fromInfo.flag} {fromInfo.country}
    </h2>

    <p><strong>🏛 Capital:</strong> {fromInfo.capital}</p>

    <p><strong>💵 Currency:</strong> {fromInfo.currency}</p>

    <p><strong>💲 Symbol:</strong> {fromInfo.symbol}</p>

    <p><strong>🏞 Landmark:</strong> {fromInfo.landmark}</p>

    <p><strong>👤 Famous Person:</strong> {fromInfo.person}</p>
  </div>

  {/* TO COUNTRY */}
  <div
    style={{
      flex: "1",
      minWidth: "220px",
      background: "rgba(255,255,255,0.08)",
      backdropFilter: "blur(12px)",
      borderRadius: "15px",
      padding: "20px",
      border: "1px solid rgba(255,255,255,0.15)",
      boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
    }}
  >
    <h2 style={{ textAlign: "center" }}>
      {toInfo.flag} {toInfo.country}
    </h2>

    <p><strong>🏛 Capital:</strong> {toInfo.capital}</p>

    <p><strong>💵 Currency:</strong> {toInfo.currency}</p>

    <p><strong>💲 Symbol:</strong> {toInfo.symbol}</p>

    <p><strong>🏞 Landmark:</strong> {toInfo.landmark}</p>

    <p><strong>👤 Famous Person:</strong> {toInfo.person}</p>
  </div>
</div>
        </div>
      </div>
    </div>
  );
}

export default App;