import { useState } from "react";
import SearchDropdown from "./components/SearchDropdown";
import { countryInfo } from "./data/countryInfo";
import CountryCard from "./components/CountryCard";

function App() {
  const [amount, setAmount] = useState("");
  const favoriteCurrencies = [
  "INR",
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "AUD",
];

  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");

  const [fromDisplay, setFromDisplay] = useState("United States");
  const [toDisplay, setToDisplay] = useState("India");

  const [result, setResult] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  
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
        "linear-gradient(135deg,#020617,#0f172a,#1e293b,#312e81,#0f172a)",
      backgroundSize: "400% 400%",
      animation: "gradient 15s ease infinite",
      padding: "50px 20px",
      color: "white",
      fontFamily: "Arial",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* Background Glow */}
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          background: "#2563eb",
          opacity: 0.18,
          filter: "blur(120px)",
          borderRadius: "50%",
          top: "-120px",
          left: "-120px",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          background: "#22c55e",
          opacity: 0.15,
          filter: "blur(120px)",
          borderRadius: "50%",
          bottom: "-100px",
          right: "-100px",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "250px",
          height: "250px",
          background: "#7c3aed",
          opacity: 0.15,
          filter: "blur(120px)",
          borderRadius: "50%",
          top: "45%",
          left: "65%",
        }}
      />
    </div>
    
      <div
  style={{
    maxWidth: "520px",
    margin: "auto",
    position: "relative",
    zIndex: 1,
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

        <div
  style={{
    marginBottom: "25px",
  }}
>
  <h3
    style={{
      marginBottom: "12px",
      color: "#cbd5e1",
      fontWeight: "500",
    }}
  >
    ⭐ Favorite Currencies
  </h3>

  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
    }}
  >
    {favoriteCurrencies.map((currency) => (
      <button
        key={currency}
        onClick={() => {
          setFromCurrency(currency);

          const info = countryInfo[currency as keyof typeof countryInfo];

          if (info) {
            setFromDisplay(info.country);
          }
        }}
        style={{
          padding: "10px 16px",
          borderRadius: "12px",
          border: "none",
          cursor: "pointer",
          background:
            fromCurrency === currency
              ? "linear-gradient(135deg,#2563eb,#7c3aed)"
              : "rgba(255,255,255,0.08)",
          color: "white",
          fontWeight: "bold",
          transition: "0.3s",
          boxShadow:
            fromCurrency === currency
              ? "0 8px 20px rgba(59,130,246,.35)"
              : "none",
        }}
      >
        {currency}
      </button>
    ))}
  </div>
</div>

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
  className="convert-btn"
  onClick={handleConvert}
>
  🚀 Convert Currency
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
  <CountryCard info={fromInfo} />
<CountryCard info={toInfo} />

</div>
        </div>
      </div>
    </div>
  );
}

export default App;