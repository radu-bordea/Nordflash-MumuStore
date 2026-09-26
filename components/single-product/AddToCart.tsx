'use client';
import { useState } from "react";
import SelectProductAmount from "./SelectProductAmount";
import { Mode } from "./SelectProductAmount";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/Buttons";
import { addToCartAction } from "@/utils/actions";
import { useAuth } from "@clerk/nextjs";

const MAX_PREORDER_AMOUNT = 10;

function AddToCart({
  productId,
  stock,
  isPreorder = false,
}: {
  productId: string;
  stock: number;
  isPreorder?: boolean;
}) {
  const canBuy = stock > 0 || isPreorder;
  const maxAmount = isPreorder ? MAX_PREORDER_AMOUNT : stock;
  const [amount, setAmount] = useState(canBuy ? 1 : 0);
  const { userId } = useAuth();

  return (
    <div className="mt-4">
      <SelectProductAmount
        mode={Mode.SingleProduct}
        amount={amount}
        setAmount={setAmount}
        maxAmount={maxAmount}
      />
      {!canBuy ? (
        <p className="text-destructive mt-2 font-semibold">Produkt utsolgt</p>
      ) : userId ? (
        <FormContainer action={addToCartAction}>
          <input type="hidden" name="productId" value={productId} />
          <input type="hidden" name="amount" value={amount} />
          <SubmitButton
            text={isPreorder ? "forhåndsbestill" : "legg i handlekurven"}
            className="mt-8"
          />
        </FormContainer>
      ) : (
        <p className="mt-2 text-muted-foreground">Logg inn for å kjøpe</p>
      )}
    </div>
  );
}

export default AddToCart;