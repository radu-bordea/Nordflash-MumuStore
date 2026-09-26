import BreadCrumbs from "@/components/single-product/BreadCrumbs";
import { fetchSingleProduct, findExistingReview } from "@/utils/actions";
import Image from "next/image";
import { formatCurrency } from "@/utils/format";
import FavoriteToggleButton from "@/components/products/FavoriteToggleButton";
import AddToCart from "@/components/single-product/AddToCart";
import ProductRating from "@/components/single-product/ProductRating";
import ShareButton from "@/components/single-product/ShareButton";
import SubmitReview from "@/components/reviews/SubmitReview";
import ProductReviews from "@/components/reviews/ProductReviews";
import { auth } from "@clerk/nextjs/server";

async function SingleProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await fetchSingleProduct(id);

  const { name, image, company, description, price, stock, allowPreorder, preorderNote } =
    product;

  const dollarsAmount = formatCurrency(price);

  const isSoldOut = stock === 0 && !allowPreorder;
  const isPreorderable = stock === 0 && allowPreorder;

  const { userId } = await auth();
  const existingReview =
    userId && !(await findExistingReview(userId, product.id));

  return (
    <section>
      <BreadCrumbs name={product.name} />

      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">

        {/* IMAGE */}
        <div className="relative h-90">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
            priority
            className="w-full rounded-md object-cover"
          />
        </div>

        {/* PRODUCT INFO */}
        <div>
          <div className="flex gap-x-8 items-center">
            <h1 className="capitalize text-3xl font-bold">{name}</h1>

            <div className="flex items-center gap-x-2">
              <FavoriteToggleButton productId={id} />
              <ShareButton name={product.name} productId={id} />
            </div>
          </div>

          <ProductRating productId={id} />

          <h4 className="text-xl mt-2">{company}</h4>

          <p className="mt-3 text-md bg-muted inline-block p-2 rounded-md">
            {dollarsAmount}
          </p>

          {/* STOCK STATUS */}
          <p className="mt-2 text-sm">
            {isSoldOut ? (
              <span className="text-destructive font-medium">Utsolgt</span>
            ) : isPreorderable ? (
              <span className="text-gold font-medium">Kan forhåndsbestilles</span>
            ) : (
              <span className="text-success font-medium">
                På lager ({stock} tilgjengelig)
              </span>
            )}
          </p>

          {!isSoldOut && !isPreorderable && stock > 0 && stock <= 5 && (
            <p className="text-warning text-sm">Kun {stock} igjen på lager</p>
          )}

          {/* PREORDER NOTE */}
          {isPreorderable && preorderNote && (
            <p className="mt-2 rounded-md bg-accent p-3 text-sm text-accent-foreground">
              {preorderNote}
            </p>
          )}

          <p className="mt-6 leading-8 text-muted-foreground">
            {description}
          </p>

          {/* ADD TO CART */}
          {isSoldOut ? (
            <button
              disabled
              className="mt-6 cursor-not-allowed rounded-md bg-muted px-4 py-2 text-muted-foreground"
            >
              Utsolgt
            </button>
          ) : (
            <AddToCart
              productId={id}
              stock={stock}
              isPreorder={isPreorderable}
            />
          )}
        </div>
      </div>

      <ProductReviews productId={id} />

      {existingReview && <SubmitReview productId={id} />}
    </section>
  );
}

export default SingleProductPage;