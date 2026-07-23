import "./CountryCard.css";

type CountryInfo = {
    country: string;
    flag: string;
    capital: string;
    landmark: string;
    person: string;
    currency: string;
    symbol: string;
};

type Props = {
    info: CountryInfo;
};

function CountryCard({ info }: Props) {
    return (
    <div className="country-card">
        <div className="country-header">
        <div className="country-flag">
            {info.flag}
        </div>

        <h2>{info.country}</h2>

        <p className="currency-name">
            {info.currency}
        </p>

        <h3 className="currency-symbol">
                    {info.symbol}
        </h3>
        </div>

        <hr />

        <p>
        🏛 <strong>Capital:</strong> {info.capital}
        </p>

        <p>
        🏞 <strong>Landmark:</strong> {info.landmark}
        </p>

        <p>
        👤 <strong>Famous:</strong> {info.person}
        </p>
    </div>
    );
}

export default CountryCard;