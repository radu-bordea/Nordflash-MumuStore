'use client';

import { Card } from "@/components/ui/card";
import { FirstColumn, SecondColumn, FourthColumn } from "./CartItemColumns";
import ThirdColumn from "./ThirdColumn";
import { CartItemWithProduct } from "@/utils/types";

const MAX_PREORDER_AMOUNT = 10;

export default function CartItemsList({
  cartItems,
}: {
  cartItems: CartItemWithProduct[];
}) {
  return (
    <div>
      {cartItems.map((cartItem) => {
        const { id, amount, product } = cartItem;
        const { image, name, company, price, stock, allowPreorder, id: productId } = product;

        const isPreorderItem = stock === 0 && allowPreorder;
        const maxAmount = isPreorderItem ? MAX_PREORDER_AMOUNT : stock;

        return (
          <Card
            key={id}
            className="flex flex-col gap-y-4 md:flex-row flex-wrap p-6 mb-8 gap-x-4"
          >
            <FirstColumn image={image} name={name} />
            <SecondColumn name={name} company={company} productId={productId} />
            <ThirdColumn id={id} quantity={amount} maxAmount={maxAmount} />
            <FourthColumn price={price} />
          </Card>
        );
      })}
    </div>
  );
}