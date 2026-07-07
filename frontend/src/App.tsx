import { useEffect, useState } from "react";

function App() {
  const [status, setStatus] = useState("Connecting to backend...");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/health")
      .then((response) => response.json())
      .then((data) => {
        setStatus(data.status);
      })
      .catch(() => {
        setStatus("❌ Failed to connect to backend");
      });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "Arial",
        fontSize: "2rem",
      }}
    >
      {status}
    </div>
  );
}

export default App;