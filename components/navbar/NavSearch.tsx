"use client";

import { Input } from "../ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect } from "react";

function NavSearch() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const searchParam = searchParams.get("search") || "";

  const [search, setSearch] = useState(searchParam);

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    replace(`/products?${params.toString()}`);
  }, 500);

  useEffect(() => {
    setSearch(searchParam);
  }, [searchParam]);

  return (
    <Input
      type="search"
      placeholder="Søk etter produkter..."
      className="w-full rounded-md border-nav-foreground/20 bg-nav-foreground/15 text-nav-foreground caret-nav-foreground placeholder:text-nav-foreground/70 focus-visible:border-gold/70 focus-visible:bg-nav-foreground/20 focus-visible:ring-gold/30 dark:bg-nav-foreground/10 dark:focus-visible:bg-nav-foreground/15"
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        handleSearch(e.target.value);
      }}
    />
  );
}

export default NavSearch;