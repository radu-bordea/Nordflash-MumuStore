import { cn } from "@/lib/utils";

function EmptyList({
  heading = "Ingen produkter funnet",
  className,
}: {
  heading?: string;
  className?: string;
}) {
  return <h2 className={cn("text-xl border-2", className)}>{heading}</h2>;
}
export default EmptyList;
