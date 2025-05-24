"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type Currency = "USD" | "GBP" | "SGD" | "EUR";

export interface CurrencyOption {
  code: Currency;
  symbol: string;
  flag: string;
  name: string;
  price: number;
}

export const CURRENCY_OPTIONS: CurrencyOption[] = [
  { code: "USD", symbol: "$", flag: "🇺🇸", name: "USD", price: 149 },
  { code: "GBP", symbol: "£", flag: "🇬🇧", name: "GBP", price: 129 },
  { code: "EUR", symbol: "€", flag: "🇪🇺", name: "EUR", price: 140 },
  { code: "SGD", symbol: "S$", flag: "🇸🇬", name: "SGD", price: 180 },
];

interface CurrencySelectorProps {
  value: Currency;
  onValueChange: (value: Currency) => void;
}

export function CurrencySelector({ value, onValueChange }: CurrencySelectorProps) {
  const selectedOption = CURRENCY_OPTIONS.find(opt => opt.code === value);
  
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[100px] h-9 text-sm">
        <SelectValue>
          {selectedOption && (
            <span className="flex items-center gap-2">
              <span>{selectedOption.flag}</span>
              <span>{selectedOption.name}</span>
            </span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {CURRENCY_OPTIONS.map((option) => (
          <SelectItem key={option.code} value={option.code}>
            <span className="flex items-center gap-2">
              <span>{option.flag}</span>
              <span>{option.name}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// Hook to persist and retrieve currency preference
export function useCurrency() {
  const [currency, setCurrency] = useState<Currency>("USD");

  useEffect(() => {
    // Retrieve saved preference from localStorage
    const saved = localStorage.getItem("preferred-currency") as Currency;
    if (saved && CURRENCY_OPTIONS.find(opt => opt.code === saved)) {
      setCurrency(saved);
    }
  }, []);

  const updateCurrency = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    localStorage.setItem("preferred-currency", newCurrency);
  };

  const currentOption = CURRENCY_OPTIONS.find(opt => opt.code === currency) || CURRENCY_OPTIONS[0];

  return {
    currency,
    setCurrency: updateCurrency,
    currentOption,
    formatPrice: (basePrice?: number) => {
      const price = basePrice || currentOption.price;
      return `${currentOption.symbol}${price}`;
    }
  };
}