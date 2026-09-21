import { Product } from "@/app/generated/prisma/client";
import { formatCurrency } from "@/utils/format";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import FavoriteToggleButton from "./FavoriteToggleButton";

function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const { name, price, image, stock } = product;
        const productId = product.id;
        const dollarsAmount = formatCurrency(price);

        return (
          <article key={productId} className="group relative">
            <Link href={stock === 0 ? "#" : `/products/${productId}`}>
              <Card
                className={`transform bg-card border-border group-hover:border-gold/60 group-hover:shadow-xl group-hover:shadow-primary/10 transition-all duration-500 relative ${
                  stock === 0 ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="relative h-64 md:h-48 rounded-md overflow-hidden bg-muted">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
                      priority
                      className="rounded w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="mt-4 text-center">
                    <h2 className="text-xl font-semibold capitalize text-card-foreground">
                      {name}
                    </h2>
                    <p className="text-primary font-medium mt-2">{dollarsAmount}</p>

                    {/* Stock text under price */}
                    {stock === 0 ? (
                      <p className="text-destructive text-xs font-semibold mt-1">Utsolgt</p>
                    ) : stock <= 5 ? (
                      <p className="text-warning text-xs font-semibold mt-1">
                        {stock} igjen
                      </p>
                    ) : (
                      <p className="text-success text-xs font-medium mt-1">På lager</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>

            <div className="absolute top-7 right-7 z-5">
              <FavoriteToggleButton productId={productId} />
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default ProductsGrid;