import { useState } from "react";
import SearchDropdown from "./components/SearchDropdown";

function App() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [result, setResult] = useState("");

  const handleConvert = async () => {

    console.log({
  from_currency: fromCurrency,
  to_currency: toCurrency,
  amount: amount,
});
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

    setResult(data.result);
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "60px auto",
        fontFamily: "Arial",
      }}
    >
      <h1>CurrencyVerse</h1>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <br />
      <br />

      <SearchDropdown label="From Currency" />

<br />

<SearchDropdown label="To Currency" />

      <br />
      <br />

      <button onClick={handleConvert}>
        Convert
      </button>

      <h2>Result: {result}</h2>
    </div>
  );
}

export default App;