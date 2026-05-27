import React, { createContext, useContext, useState, ReactNode } from "react";

interface FilterState {
  category: string;
  brand: string;
  productType: string;
  sort: string;
}

interface FilterContextProps extends FilterState {
  setCategory: (c: string) => void;
  setBrand: (b: string) => void;
  setProductType: (p: string) => void;
  setSort: (s: string) => void;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export function ProductFilterProvider({ children }: { children: ReactNode }) {
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All Brands");
  const [productType, setProductType] = useState("All Types");
  const [sort, setSort] = useState("price-asc");

  return (
    <FilterContext.Provider
      value={{ category, brand, productType, sort, setCategory, setBrand, setProductType, setSort }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useProductFilter() {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useProductFilter must be used within ProductFilterProvider");
  return ctx;
}
