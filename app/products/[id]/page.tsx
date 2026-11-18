import type { Metadata } from "next";
import { cache } from "react";
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
import { SITE_URL } from "@/utils/seo";

// Fetch once per request, shared by generateMetadata and the page
const getProduct = cache((id: string) => fetchSingleProduct(id));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  const description = product.description.slice(0, 155);

  return {
    title: product.name,
    description,
    alternates: { canonical: `/products/${id}` },
    openGraph: {
      title: product.name,
      description,
      url: `${SITE_URL}/products/${id}`,
      images: [{ url: product.image }],
    },
  };
}

async function SingleProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getProduct(id);

  const { name, image, company, description, price, stock, allowPreorder, preorderNote } =
    product;

  const dollarsAmount = formatCurrency(price);

  const isSoldOut = stock === 0 && !allowPreorder;
  const isPreorderable = stock === 0 && allowPreorder;

  const { userId } = await auth();
  const existingReview =
    userId && !(await findExistingReview(userId, product.id));

  // Structured data so Google can show price and availability
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    image: [image],
    description,
    brand: { "@type": "Brand", name: "Lachi" },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/products/${id}`,
      priceCurrency: "NOK",
      price, // whole NOK. If you store øre, use price / 100
      availability: isSoldOut
        ? "https://schema.org/OutOfStock"
        : isPreorderable
          ? "https://schema.org/PreOrder"
          : "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

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