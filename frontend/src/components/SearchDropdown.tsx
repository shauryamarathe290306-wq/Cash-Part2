
import { useEffect, useMemo, useState } from "react";

type Props = {
    label: string;
  value: string; // Currency code (INR, USD...)
  displayValue: string; // What the user sees (India, USA...)
    onSelect: (code: string, display: string) => void;
    onInputChange: (value: string) => void;
};

interface Currency {
    code: string;
    country: string;
    currency: string;
    symbol: string;
    flag: string;
    continent: string;
}

function SearchDropdown({
    label,
    value,
    displayValue,
    onSelect,
    onInputChange,
}: Props) {
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    useEffect(() => {
    const fetchCurrencies = async () => {
    try {
        const response = await fetch("http://127.0.0.1:8000/currencies/");
        const data = await response.json();

        setCurrencies(data);
    } catch (error) {
        console.error("Failed to load currencies:", error);
    }
    };

    fetchCurrencies();
}, []);
    const filteredCurrencies = useMemo(() => {
    if (!displayValue.trim()) {
        return currencies;
    }

    const search = displayValue.toLowerCase();

    return currencies.filter((currency) =>
        currency.country.toLowerCase().includes(search) ||
        currency.currency.toLowerCase().includes(search) ||
        currency.code.toLowerCase().includes(search)
    );
}, [displayValue, currencies]);
    return (
    <div
        style={{
        marginBottom: "20px",
        position: "relative",
        }}
    >
        <label
        style={{
            display: "block",
            fontWeight: "bold",
            marginBottom: "6px",
        }}
        >
        {label}
        </label>

        <input
        type="text"
        placeholder="Search country or currency..."
        value={displayValue}
        onChange={(e) => onInputChange(e.target.value)}
        style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
        }}
        />

        {displayValue.length > 0 && (
        <div
            style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            marginTop: "5px",
            maxHeight: "220px",
            overflowY: "auto",
            background: "white",
            position: "absolute",
            width: "100%",
            zIndex: 1000,
            }}
        >
            {filteredCurrencies.length > 0 ? (
            filteredCurrencies.map((currency) => (
            <div
                key={currency.code}
                onClick={() =>
                    onSelect(
                    currency.code,
                    `${currency.flag} ${currency.country}`
                    )
                }
                style={{
                    padding: "10px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                }}
                >
                <strong>
                {currency.flag} {currency.country}
                </strong>

                <br />

                {currency.currency}

                <br />

                <small>{currency.code}</small>
                </div>
            ))
            ) : (
            <div
                style={{
                padding: "10px",
                color: "#777",
                }}
            >
                No matching country found
            </div>
            )}
        </div>
        )}
    </div>
    );
}

export default SearchDropdown;