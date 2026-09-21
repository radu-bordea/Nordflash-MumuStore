import Link from "next/link";
import { Button } from "../ui/button";
import { LuShoppingBag } from "react-icons/lu";
import { fetchCartItems } from "@/utils/actions";

async function CartButton() {
  // temporary
  const numItemsCart = await fetchCartItems();
  return (
    <Button
      asChild
      variant="outline"
      size="icon"
      className="flex justify-center items-center relative border-nav-foreground/30 bg-transparent text-nav-foreground hover:bg-nav-foreground/10 hover:text-nav-foreground dark:border-nav-foreground/30 dark:bg-transparent dark:hover:bg-nav-foreground/10"
    >
      <Link href="/cart">
        <LuShoppingBag />
        <span className="absolute -top-3 -right-3 bg-gold text-gold-foreground ring-2 ring-nav rounded-full h-6 w-6 flex items-center justify-center text-xs font-semibold">
          {numItemsCart}
        </span>
      </Link>
    </Button>
  );
}
export default CartButton;