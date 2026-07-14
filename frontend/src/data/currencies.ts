export interface Currency {
  country: string;
  currency: string;
  code: string;
  flag: string;
  aliases: string[];
}

export const currencies: Currency[] = [
  {
    country: "India",
    currency: "Indian Rupee",
    code: "INR",
    flag: "🇮🇳",
    aliases: [
      "india",
      "ind",
      "inr",
      "indian",
      "indian rupee"
    ]
  },

  {
    country: "Pakistan",
    currency: "Pakistani Rupee",
    code: "PKR",
    flag: "🇵🇰",
    aliases: [
      "pakistan",
      "pak",
      "pkr",
      "pakistani",
      "pakistani rupee"
    ]
  },

  {
    country: "United States",
    currency: "US Dollar",
    code: "USD",
    flag: "🇺🇸",
    aliases: [
      "usa",
      "us",
      "america",
      "united states",
      "usd",
      "dollar",
      "us dollar"
    ]
  },

  {
    country: "Australia",
    currency: "Australian Dollar",
    code: "AUD",
    flag: "🇦🇺",
    aliases: [
      "australia",
      "aus",
      "aud",
      "australian",
      "australian dollar"
    ]
  },

  {
    country: "United Kingdom",
    currency: "Pound Sterling",
    code: "GBP",
    flag: "🇬🇧",
    aliases: [
      "uk",
      "united kingdom",
      "england",
      "britain",
      "gbp",
      "pound"
    ]
  },

  {
    country: "Japan",
    currency: "Japanese Yen",
    code: "JPY",
    flag: "🇯🇵",
    aliases: [
      "japan",
      "jpy",
      "yen",
      "japanese yen"
    ]
  },

  {
    country: "China",
    currency: "Chinese Yuan",
    code: "CNY",
    flag: "🇨🇳",
    aliases: [
      "china",
      "cny",
      "yuan",
      "renminbi"
    ]
  },

  {
    country: "United Arab Emirates",
    currency: "UAE Dirham",
    code: "AED",
    flag: "🇦🇪",
    aliases: [
      "uae",
      "dubai",
      "aed",
      "dirham"
    ]
  }
];