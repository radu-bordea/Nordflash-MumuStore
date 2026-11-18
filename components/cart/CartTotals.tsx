import { Card, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/utils/format";
import { createOrderAction } from "@/utils/actions";
import { SubmitButton } from "../form/Buttons";
import { Cart } from "@/app/generated/prisma/client";
import { FREE_SHIPPING_THRESHOLD } from "@/utils/shipping";

function CartTotals({ cart }: { cart: Cart }) {
  const { cartTotal, shipping, tax, orderTotal } = cart;
  const remaining = FREE_SHIPPING_THRESHOLD - cartTotal;

  return (
    <div>
      <Card className="p-8">
        <CartTotalRow label="Delsum" amount={cartTotal} />
        <CartTotalRow
          label="Frakt"
          amount={shipping}
          display={shipping === 0 && cartTotal > 0 ? "Gratis" : undefined}
        />
        <CardTitle className="mt-8">
          <CartTotalRow label="Totalt å betale" amount={orderTotal} lastRow />
        </CardTitle>
        {tax > 0 && (
          <p className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>Herav MVA (25%)</span>
            <span>{formatCurrency(tax)}</span>
          </p>
        )}
        {cartTotal > 0 && remaining > 0 && (
          <p className="mt-4 rounded-md bg-accent p-3 text-sm text-accent-foreground">
            Handle for {formatCurrency(remaining)} til for gratis frakt
          </p>
        )}
      </Card>
      <form action={createOrderAction as any}>
        <SubmitButton text="Gå til betaling" className="w-full mt-8 cursor-pointer" />
      </form>
    </div>
  );
}

function CartTotalRow({
  label,
  amount,
  display,
  lastRow,
}: {
  label: string;
  amount: number;
  display?: string;
  lastRow?: boolean;
}) {
  return (
    <>
      <p className="flex justify-between text-sm">
        <span>{label}</span>
        <span>{display ?? formatCurrency(amount)}</span>
      </p>
      {lastRow ? null : <Separator className="my-2" />}
    </>
  );
}

export default CartTotals;