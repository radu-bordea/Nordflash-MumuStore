'use client';
import { useState } from "react";
import SelectProductAmount from "./SelectProductAmount";
import { Mode } from "./SelectProductAmount";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/Buttons";
import { addToCartAction } from "@/utils/actions";
import { useAuth } from "@clerk/nextjs";

function AddToCart({ productId, stock }: { productId: string; stock: number }) {
  const [amount, setAmount] = useState(stock > 0 ? 1 : 0);
  const { userId } = useAuth();

  return (
    <div className="mt-4">
      <SelectProductAmount
        mode={Mode.SingleProduct}
        amount={amount}
        setAmount={setAmount}
        maxAmount={stock} // prevent selecting more than stock
      />
      {stock === 0 ? (
        <p className="text-red-500 mt-2 font-semibold">Produkt utsolgt</p>
      ) : userId ? (
        <FormContainer action={addToCartAction}>
          <input type="hidden" name="productId" value={productId} />
          <input type="hidden" name="amount" value={amount} />
          <SubmitButton text="legg i handlekurven" className="mt-8" />
        </FormContainer>
      ) : (
        <p className="mt-2 text-muted-foreground">Logg inn for å kjøpe</p>
      )}
    </div>
  );
}

export default AddToCart;