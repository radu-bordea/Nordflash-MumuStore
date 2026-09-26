import { formatCurrency } from "@/utils/format";

function SalesSummaryCards({
  totals,
}: {
  totals: { orderTotal: number; tax: number; shipping: number; count: number };
}) {
  const netExclVat = totals.orderTotal - totals.tax;
  const avgOrder = totals.count ? totals.orderTotal / totals.count : 0;

  const cards = [
    { label: "Totalt salg (inkl. MVA)", value: formatCurrency(totals.orderTotal) },
    { label: "Herav MVA", value: formatCurrency(totals.tax) },
    { label: "Netto (uten MVA)", value: formatCurrency(netExclVat) },
    { label: "Frakt totalt", value: formatCurrency(totals.shipping) },
    { label: "Antall bestillinger", value: `${totals.count}` },
    { label: "Snitt per bestilling", value: formatCurrency(avgOrder) },
  ];

  return (
    <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {cards.map((c) => (
        <div key={c.label} className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">{c.label}</p>
          <p className="mt-1 text-lg font-semibold">{c.value}</p>
        </div>
      ))}
    </div>
  );
}
export default SalesSummaryCards;