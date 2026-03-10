'use client';
import { useState } from 'react';
import SelectProductAmount from '../single-product/SelectProductAmount';
import { Mode } from '../single-product/SelectProductAmount';
import FormContainer from '../form/FormContainer';
import { SubmitButton } from '../form/Buttons';
import { removeCartItemAction, updateCartItemAction } from '@/utils/actions';
import { toast } from 'sonner';

interface ThirdColumnProps {
  quantity: number;
  id: string;
  maxAmount: number; // maximum available stock
}

function ThirdColumn({ quantity, id, maxAmount }: ThirdColumnProps) {
  const [amount, setAmount] = useState(quantity);
  const [isLoading, setIsLoading] = useState(false);

  const handleAmountChange = async (value: number) => {
    if (value > maxAmount) {
      toast.error(`Maks tilgjengelig antall er ${maxAmount}`);
      return;
    }

    setIsLoading(true);
    try {
      const result = await updateCartItemAction({
        amount: value,
        cartItemId: id,
      });
      setAmount(value);
      toast.message(result.message);
    } catch (err) {
      console.error(err);
      toast.error('Klarte ikke oppdatere antall');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='md:ml-8'>
      <SelectProductAmount
        mode={Mode.CartItem}
        amount={amount}
        setAmount={handleAmountChange}
        isLoading={isLoading}
        maxAmount={maxAmount}
      />
      <FormContainer action={removeCartItemAction}>
        <input type='hidden' name='id' value={id} />
        <SubmitButton size='sm' className='mt-4' text='fjern' />
      </FormContainer>
    </div>
  );
}

export default ThirdColumn;