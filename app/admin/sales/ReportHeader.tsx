import { formatDate, formatDateRangeLabel } from "@/utils/format";

function ReportHeader({
  from,
  to,
  email,
}: {
  from?: string;
  to?: string;
  email?: string;
}) {
  return (
    <div className="mb-4 rounded-lg border border-border bg-card p-4">
      <p className="text-sm font-medium">{formatDateRangeLabel(from, to, email)}</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Generert: {formatDate(new Date())}
      </p>
    </div>
  );
}
export default ReportHeader;