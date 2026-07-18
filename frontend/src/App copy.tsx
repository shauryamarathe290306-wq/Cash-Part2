import { useState } from "react";
import SearchDropdown from "./components/SearchDropdown";

function App() {
  const [amount, setAmount] = useState("");

  // Backend values (currency codes)
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");

  // Display values (what user sees)
  const [fromDisplay, setFromDisplay] = useState("United States");
  const [toDisplay, setToDisplay] = useState("India");

  const [result, setResult] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

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
        maxWidth: "500px",
        margin: "60px auto",
        fontFamily: "Arial",
      }}
    >
      <h1>🌍 CurrencyVerse</h1>

      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          marginBottom: "20px",
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
          margin: "15px 0",
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
            width: "55px",
            height: "55px",
            borderRadius: "50%",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            background: "#2b2b2b",
            color: "white",
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
          padding: "12px",
          marginTop: "20px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Convert
      </button>

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          background: "#222",
          borderRadius: "12px",
          textAlign: "center",
          color: "white",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        <h3
          style={{
            marginBottom: "15px",
            color: "#4CAF50",
          }}
        >
          ✅ Conversion Result
        </h3>

        <p
          style={{
            fontSize: "18px",
            marginBottom: "10px",
          }}
        >
          {Number(amount || 0).toLocaleString("en-IN")} {fromCurrency}
        </p>

        <p
          style={{
            fontSize: "24px",
            margin: "10px 0",
          }}
        >
          ↓
        </p>

        <h2
          style={{
            fontSize: "30px",
            margin: 0,
          }}
        >
          {result} {toCurrency}
        </h2>

        <hr
          style={{
            margin: "25px 0",
            borderColor: "#444",
          }}
        />

        <p
          style={{
            color: "#bbb",
            marginBottom: "5px",
          }}
        >
          Exchange Rate
        </p>

        <h3 style={{ marginTop: 0 }}>
          {exchangeRate}
        </h3>

        <hr
          style={{
            margin: "25px 0",
            borderColor: "#444",
          }}
        />

        <p
          style={{
            color: "#bbb",
            marginBottom: "5px",
          }}
        >
          Last Updated
        </p>

        <p>{lastUpdated}</p>
      </div>
    </div>
  );
}

export default App;