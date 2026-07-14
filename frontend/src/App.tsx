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
        setResult(data.result);
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

      <h2 style={{ marginTop: "20px" }}>
        Result: {result}
      </h2>
    </div>
  );
}

export default App;