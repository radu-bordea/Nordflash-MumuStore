import { Card, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/utils/format';
import { createOrderAction } from '@/utils/actions';
import { SubmitButton } from '../form/Buttons';
import { Cart } from '@/app/generated/prisma/client';
import { redirectActionFunction } from '@/utils/types';



function CartTotals({ cart }: { cart: Cart }) {
  const { cartTotal, shipping, tax, orderTotal } = cart;

  return (
    <div>
      <Card className='p-8'>
        <CartTotalRow label='Delsum' amount={cartTotal} />
        <CartTotalRow label='Frakt' amount={shipping} />
        <CartTotalRow label='Avgift' amount={tax} />
        <CardTitle className='mt-8'>
          <CartTotalRow label='Totalt antall bestillinger' amount={orderTotal} lastRow />
        </CardTitle>
      </Card>
      <form action={createOrderAction as any}>
        <SubmitButton text='Legg til bestilling' className='w-full mt-8' />
      </form>
    </div>
  );
}

function CartTotalRow({
  label,
  amount,
  lastRow,
}: {
  label: string;
  amount: number;
  lastRow?: boolean;
}) {
  return (
    <>
      <p className='flex justify-between text-sm'>
        <span>{label}</span>
        <span>{formatCurrency(amount)}</span>
      </p>
      {lastRow ? null : <Separator className='my-2' />}
    </>
  );
}

export default CartTotals;