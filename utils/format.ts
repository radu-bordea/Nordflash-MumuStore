export const formatCurrency = (amount: number | null) => {
  const value = amount || 0;
  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
  }).format(value);
};

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("nb-NO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

export const formatDateRangeLabel = (
  from?: string | null,
  to?: string | null,
  email?: string | null,
) => {
  const parts: string[] = [];

  if (from || to) {
    const fromLabel = from ? formatDate(new Date(from)) : "starten";
    const toLabel = to ? formatDate(new Date(to)) : "nå";
    parts.push(`Periode: ${fromLabel} – ${toLabel}`);
  } else {
    parts.push("Periode: Alle bestillinger");
  }

  if (email) parts.push(`Kunde: ${email}`);

  return parts.join("   |   ");
};