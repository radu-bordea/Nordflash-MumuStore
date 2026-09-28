"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function toDateInput(d: Date) {
  return d.toISOString().slice(0, 10);
}

function SalesFiltersForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [from, setFrom] = useState(searchParams.get("from") ?? "");
  const [to, setTo] = useState(searchParams.get("to") ?? "");
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const groupBy = searchParams.get("groupBy") ?? "day";

  const applyParams = (next: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(next).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    router.push(`${pathname}?${params.toString()}`);
    router.refresh();
  };

  const handleDateChange = (key: "from" | "to", value: string) => {
    if (key === "from") setFrom(value);
    else setTo(value);

    applyParams({
      from: key === "from" ? value : from,
      to: key === "to" ? value : to,
      email,
    });
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    applyParams({ from, to, email: value });
  };

  const setQuickRange = (
    range: "thisMonth" | "lastMonth" | "thisYear" | "all",
  ) => {
    const now = new Date();
    let f = "";
    let t = "";

    if (range === "thisMonth") {
      f = toDateInput(new Date(now.getFullYear(), now.getMonth(), 1));
      t = toDateInput(now);
    } else if (range === "lastMonth") {
      f = toDateInput(new Date(now.getFullYear(), now.getMonth() - 1, 1));
      t = toDateInput(new Date(now.getFullYear(), now.getMonth(), 0));
    } else if (range === "thisYear") {
      f = toDateInput(new Date(now.getFullYear(), 0, 1));
      t = toDateInput(now);
    }

    setFrom(f);
    setTo(t);
    applyParams({ from: f, to: t });
  };

  const preorderOnly = searchParams.get("preorderOnly") === "true";

  const togglePreorderOnly = () => {
    applyParams({ preorderOnly: preorderOnly ? undefined : "true" });
  };

  return (
    <div className="mb-6 space-y-4 rounded-lg border border-border bg-card p-4">
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <Label htmlFor="from">Fra dato</Label>
          <Input
            id="from"
            type="date"
            value={from}
            onChange={(e) => handleDateChange("from", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="to">Til dato</Label>
          <Input
            id="to"
            type="date"
            value={to}
            onChange={(e) => handleDateChange("to", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="email">Person (e-post)</Label>
          <Input
            id="email"
            type="text"
            placeholder="navn@epost.no"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            className="min-w-50"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          className="cursor-pointer"
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setQuickRange("thisMonth")}
        >
          Denne måneden
        </Button>
        <Button
          className="cursor-pointer"
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setQuickRange("lastMonth")}
        >
          Forrige måned
        </Button>
        <Button
        className="cursor-pointer"
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setQuickRange("thisYear")}
        >
          Dette året
        </Button>
        <Button
        className="cursor-pointer"
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setQuickRange("all")}
        >
          Alt
        </Button>
      </div>

      <Button
        type="button"
        variant={preorderOnly ? "default" : "outline"}
        size="sm"
        onClick={togglePreorderOnly}
        className="cursor-pointer"
      >
        Kun forhåndsbestillinger
      </Button>

      <div className="flex flex-wrap items-center gap-2 border-t border-border pt-3">
        <Label className="mr-1">Grupper etter</Label>
        {(["day", "month", "year"] as const).map((g) => (
          <Button
          className="capitalize cursor-pointer"
            key={g}
            type="button"
            size="sm"
            variant={groupBy === g ? "default" : "outline"}
            onClick={() => applyParams({ groupBy: g })}
          >
            {g === "day" ? "Dag" : g === "month" ? "Måned" : "År"}
          </Button>
        ))}
      </div>
    </div>
  );
}
export default SalesFiltersForm;