import SalesFiltersForm from "./SalesFiltersForm";
import SalesSummaryCards from "./SalesSummaryCards";
import SalesChart from "./SalesChart";
import DownloadDashboardPdfButton from "./DownloadDashboardPdfButton";
import ReportHeader from "./ReportHeader";
import PendingPreordersCard from "./PendingPreordersCard";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { LuDownload } from "react-icons/lu";
import { fetchSalesSummary, GroupBy, SalesFilters } from "@/utils/actions";
import { formatCurrency, formatDate } from "@/utils/format";

type SearchParams = {
  from?: string;
  to?: string;
  email?: string;
  groupBy?: GroupBy;
  preorderOnly?: string;
};

async function SalesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const filters: SalesFilters = {
    from: params.from,
    to: params.to,
    email: params.email,
    preorderOnly: params.preorderOnly === "true",
  };
  const groupBy: GroupBy = params.groupBy ?? "day";

  const { orders, totals, chartData } = await fetchSalesSummary(
    filters,
    groupBy,
  );

  const pdfParams = new URLSearchParams();
  if (filters.from) pdfParams.set("from", filters.from);
  if (filters.to) pdfParams.set("to", filters.to);
  if (filters.email) pdfParams.set("email", filters.email);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Salg</h1>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <a href={`/api/admin/sales/pdf?${pdfParams.toString()}`}>
              <LuDownload className="mr-2 h-4 w-4" />
              Last ned tabell (PDF)
            </a>
          </Button>
          <DownloadDashboardPdfButton targetId="dashboard-report" />
        </div>
      </div>

      <SalesFiltersForm />

      <PendingPreordersCard orders={orders} />

      <div id="dashboard-report">
        <ReportHeader
          from={filters.from}
          to={filters.to}
          email={filters.email}
        />
        <SalesSummaryCards totals={totals} />
        <SalesChart data={chartData} />

        <Table>
          <TableCaption className="text-foreground font-medium py-2">
            Totalt antall bestillinger: {orders.length}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Ordre-ID</TableHead>
              <TableHead>E-post</TableHead>
              <TableHead>Produkter</TableHead>
              <TableHead>Totalt</TableHead>
              <TableHead>MVA</TableHead>
              <TableHead>Frakt</TableHead>
              <TableHead>Dato</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => {
              const {
                id,
                products,
                orderTotal,
                tax,
                shipping,
                createdAt,
                email,
                isPreorder,
              } = order;
              return (
                <TableRow key={id}>
                  <TableCell className="font-mono text-xs">
                    {id.slice(0, 8).toUpperCase()}
                  </TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>{products}</TableCell>
                  <TableCell>{formatCurrency(orderTotal)}</TableCell>
                  <TableCell>{formatCurrency(tax)}</TableCell>
                  <TableCell>{formatCurrency(shipping)}</TableCell>
                  <TableCell>{formatDate(createdAt)}</TableCell>
                  <TableCell>
                    {isPreorder && (
                      <span className="rounded-full bg-gold/20 px-2 py-0.5 text-xs font-medium text-gold">
                        Forhåndsbestilling
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
export default SalesPage;