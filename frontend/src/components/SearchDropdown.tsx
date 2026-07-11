import { useState } from "react";

type Props = {
    label: string;
};

function SearchDropdown({ label }: Props) {
    const [search, setSearch] = useState("");

    return (
    <div style={{ marginBottom: "20px" }}>
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
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
        }}
        />
    </div>
    );
}

export default SearchDropdown;