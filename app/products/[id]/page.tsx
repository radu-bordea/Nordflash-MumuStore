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

  const { name, image, company, description, price, stock } = product;

  const dollarsAmount = formatCurrency(price);

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
            {stock > 0 ? (
              <span className="text-green-600 font-medium">
                In stock ({stock} available)
              </span>
            ) : (
              <span className="text-red-600 font-medium">
                Out of stock
              </span>
            )}
          </p>

          {stock > 0 && stock <= 5 && (
            <p className="text-orange-500 text-sm">
              Only {stock} left in stock
            </p>
          )}

          <p className="mt-6 leading-8 text-muted-foreground">
            {description}
          </p>

          {/* ADD TO CART */}
          {stock > 0 ? (
            <AddToCart productId={id} stock={stock}/>
          ) : (
            <button
              disabled
              className="mt-6 bg-gray-400 text-white px-4 py-2 rounded-md cursor-not-allowed"
            >
              Out of Stock
            </button>
          )}
        </div>
      </div>

      <ProductReviews productId={id} />

      {existingReview && <SubmitReview productId={id} />}
    </section>
  );
}

export default SingleProductPage;