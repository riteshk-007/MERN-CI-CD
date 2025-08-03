import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

function App() {
  const [count, setCount] = useState(0);
  const [apiStatus, setApiStatus] = useState("Checking API Status...");
  const [isChecking, setIsChecking] = useState(false);
  const [apiData, setApiData] = useState(null);

  console.log("API_BASE_URL", API_BASE_URL);

  const checkApiHealth = async () => {
    try {
      setIsChecking(true);
      setApiStatus("Checking API Status...");

      const response = await fetch(`${API_BASE_URL}/health`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setApiData(data);
      setApiStatus("✅ API is running successfully!");
    } catch (error) {
      console.error("API Error:", error);
      setApiStatus(`❌ API Error: ${error.message}`);
      setApiData(null);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkApiHealth();
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      {/* API Status Section */}
      <div
        className="card"
        style={{
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <h3>API Status</h3>
        <p
          style={{
            fontWeight: "bold",
            color: apiStatus.includes("✅")
              ? "green"
              : apiStatus.includes("❌")
              ? "red"
              : "orange",
          }}
        >
          {apiStatus}
        </p>
        {isChecking && <p>🔄 Checking...</p>}
        {apiData && (
          <div
            style={{
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#000",
              borderRadius: "4px",
            }}
          >
            <strong>API Response:</strong>
            <pre style={{ fontSize: "12px", marginTop: "5px" }}>
              {JSON.stringify(apiData, null, 2)}
            </pre>
          </div>
        )}
        <button
          onClick={checkApiHealth}
          disabled={isChecking}
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isChecking ? "not-allowed" : "pointer",
            opacity: isChecking ? 0.6 : 1,
          }}
        >
          {isChecking ? "Checking..." : "Check API Again"}
        </button>
      </div>

      <div className="card">
        <button
          onClick={() => {
            setCount((count) => count + 1);
          }}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
