import { Order, OrderItem } from "@/app/generated/prisma/client";
import { formatCurrency, formatDate } from "@/utils/format";
import { markOrderItemFulfilledAction } from "@/utils/actions";
import { Card } from "@/components/ui/card";
import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";

type OrderWithItems = Order & { orderItems: OrderItem[] };

function PendingPreordersCard({ orders }: { orders: OrderWithItems[] }) {
  const pendingLines = orders.flatMap((order) =>
    order.orderItems
      .filter((item) => item.isPreorder && !item.preorderFulfilled)
      .map((item) => ({ ...item, orderEmail: order.email, orderDate: order.createdAt })),
  );

  if (pendingLines.length === 0) {
    return (
      <Card className="mb-6 p-4">
        <p className="text-sm text-muted-foreground">
          Ingen ventende forhåndsbestillinger i valgt periode.
        </p>
      </Card>
    );
  }

  return (
    <Card className="mb-6 p-4">
      <h3 className="mb-4 text-sm font-medium text-muted-foreground">
        Ventende forhåndsbestillinger ({pendingLines.length})
      </h3>
      <div className="space-y-3">
        {pendingLines.map((item) => (
          <div
            key={item.id}
            className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border p-3"
          >
            <div>
              <p className="font-medium">
                {item.name} × {item.quantity}
              </p>
              <p className="text-xs text-muted-foreground">
                {item.orderEmail} — bestilt {formatDate(item.orderDate)} —{" "}
                {formatCurrency(item.price * item.quantity)}
              </p>
            </div>
            <FormContainer action={markOrderItemFulfilledAction}>
              <input type="hidden" name="orderItemId" value={item.id} />
              <SubmitButton text="Marker som fullført" size="sm" />
            </FormContainer>
          </div>
        ))}
      </div>
    </Card>
  );
}
export default PendingPreordersCard;