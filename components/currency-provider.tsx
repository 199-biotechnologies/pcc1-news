"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Currency, CurrencyOption, CURRENCY_OPTIONS } from "./currency-selector";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  currentOption: CurrencyOption;
  formatPrice: (basePrice?: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Retrieve saved preference from localStorage
    const saved = localStorage.getItem("preferred-currency") as Currency;
    if (saved && CURRENCY_OPTIONS.find(opt => opt.code === saved)) {
      setCurrency(saved);
    }
  }, []);

  const updateCurrency = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    if (isClient) {
      localStorage.setItem("preferred-currency", newCurrency);
    }
  };

  const currentOption = CURRENCY_OPTIONS.find(opt => opt.code === currency) || CURRENCY_OPTIONS[0];

  const formatPrice = (basePrice?: number) => {
    const price = basePrice || currentOption.price;
    return `${currentOption.symbol}${price}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency: updateCurrency,
        currentOption,
        formatPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}