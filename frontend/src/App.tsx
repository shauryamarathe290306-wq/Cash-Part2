import { useState } from "react";

function App() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [result, setResult] = useState("");

  const handleConvert = async () => {
    const response = await fetch("http://127.0.0.1:8000/currencies/convert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Number(amount),
        rate: Number(rate),
      }),
    });

    const data = await response.json();

    setResult(data.converted_amount);
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

      <input
        type="number"
        placeholder="Exchange Rate"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
      />

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