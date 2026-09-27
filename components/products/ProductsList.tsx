import { formatCurrency } from "@/utils/format";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/app/generated/prisma/client";
import Image from "next/image";
import FavoriteToggleButton from "./FavoriteToggleButton";

function ProductsList({ products }: { products: Product[] }) {
  return (
    <div className="mt-12 grid gap-y-8">
      {products.map((product) => {
        const { name, price, image, company, stock, allowPreorder } = product;
        const productId = product.id;
        const dollarsAmount = formatCurrency(price);
        const isSoldOut = stock === 0 && !allowPreorder;
        const isPreorderable = stock === 0 && allowPreorder;

        return (
          <article key={productId} className="group relative">
            <Link href={isSoldOut ? "#" : `/products/${productId}`}>
              <Card
                className={`transform bg-card border-border group-hover:border-gold/60 group-hover:shadow-xl transition-all duration-500 relative ${
                  isSoldOut ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                <CardContent className="p-8 gap-y-4 grid md:grid-cols-3">
                  <div className="relative h-64 md:h-48 md:w-48 rounded-md overflow-hidden bg-muted">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
                      priority
                      className="w-full rounded-md object-cover"
                    />
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold capitalize text-card-foreground">
                      {name}
                    </h2>
                    <h4 className="text-muted-foreground">{company}</h4>
                  </div>

                  <div className="md:ml-auto">
                    <p className="text-primary text-lg font-medium">{dollarsAmount}</p>

                    {isSoldOut ? (
                      <p className="text-destructive text-xs font-semibold mt-1">Utsolgt</p>
                    ) : isPreorderable ? (
                      <p className="text-gold text-xs font-semibold mt-1">Forhåndsbestilling</p>
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

            <div className="absolute bottom-8 right-8 z-5">
              <FavoriteToggleButton productId={productId} />
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default ProductsList;