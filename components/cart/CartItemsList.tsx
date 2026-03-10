'use client';

import { Card } from "@/components/ui/card";
import { FirstColumn, SecondColumn, FourthColumn } from "./CartItemColumns";
import ThirdColumn from "./ThirdColumn";
import { CartItemWithProduct } from "@/utils/types";

export default function CartItemsList({
  cartItems,
}: {
  cartItems: CartItemWithProduct[];
}) {
  return (
    <div>
      {cartItems.map((cartItem) => {
        const { id, amount, product } = cartItem;
        const { image, name, company, price, stock, id: productId } = product;

        return (
          <Card
            key={id}
            className="flex flex-col gap-y-4 md:flex-row flex-wrap p-6 mb-8 gap-x-4"
          >
            <FirstColumn image={image} name={name} />
            <SecondColumn name={name} company={company} productId={productId} />
            <ThirdColumn id={id} quantity={amount} maxAmount={stock} />
            <FourthColumn price={price} />
          </Card>
        );
      })}
    </div>
  );
}