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
        const { name, price, image, company, stock } = product;
        const productId = product.id;
        const dollarsAmount = formatCurrency(price);

        return (
          <article key={productId} className="group relative">
            <Link href={stock === 0 ? "#" : `/products/${productId}`}>
              <Card
                className={`transform group-hover:shadow-xl transition-shadow duration-500 relative ${
                  stock === 0 ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                {/* Stock badge */}
                {/* <div className="absolute top-3 left-3 z-10">
                  {stock === 0 ? (
                    <span className="bg-red-500 text-white px-2 py-1 text-xs rounded">
                      Utsolgt
                    </span>
                  ) : stock <= 5 ? (
                    <span className="bg-yellow-400 text-black px-2 py-1 text-xs rounded">
                      {stock} igjen
                    </span>
                  ) : null}
                </div> */}

                <CardContent className="p-8 gap-y-4 grid md:grid-cols-3">
                  <div className="relative h-64 md:h-48 md:w-48">
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
                    <h2 className="text-xl font-semibold capitalize">{name}</h2>
                    <h4 className="text-muted-foreground">{company}</h4>
                  </div>

                  <div className="md:ml-auto">
                    <p className="text-muted-foreground text-lg">{dollarsAmount}</p>

                    {/* Stock text under price */}
                    {stock === 0 ? (
                      <p className="text-red-500 text-xs font-semibold mt-1">Utsolgt</p>
                    ) : stock <= 5 ? (
                      <p className="text-yellow-600 text-xs font-semibold mt-1">
                        {stock} igjen
                      </p>
                    ) : (
                      <p className="text-green-600 text-xs font-medium mt-1">På lager</p>
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