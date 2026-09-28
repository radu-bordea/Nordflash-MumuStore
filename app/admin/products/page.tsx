import EmptyList from "@/components/global/EmptyList";
import { deleteProductAction, fetchAdminProducts } from "@/utils/actions";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/utils/format";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IconButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";

async function ItemsPage() {
  const items = await fetchAdminProducts();
  if (items.length === 0) return <EmptyList />;

  return (
    <section>
      <Table>
        <TableCaption className="capitalize text-foreground font-medium py-2">
          totale produkter : {items.length}
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Produktnavn</TableHead>
            <TableHead>Bedrift</TableHead>
            <TableHead>Pris</TableHead>
            <TableHead>Lager</TableHead>
            <TableHead>Handlinger</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items.map((item) => {
            const {
              id: productId,
              name,
              company,
              price,
              stock,
              image,
              allowPreorder,
            } = item;

            return (
              <TableRow key={productId}>
                <TableCell>
                  <Link
                    href={`/admin/products/${productId}/edit`}
                    className="flex items-center gap-3"
                  >
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-muted">
                      <Image
                        src={image}
                        alt={name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <span className="underline text-muted-foreground tracking-wide capitalize">
                      {name}
                    </span>
                  </Link>
                </TableCell>

                <TableCell>{company}</TableCell>

                <TableCell>{formatCurrency(price)}</TableCell>

                <TableCell
                  className={`font-semibold ${
                    stock === 0
                      ? allowPreorder
                        ? "text-gold"
                        : "text-destructive"
                      : stock <= 5
                        ? "text-warning"
                        : "text-success"
                  }`}
                >
                  {stock}
                  {stock === 0 && allowPreorder && (
                    <span className="ml-2 text-xs font-normal">
                      (forhåndsbestilling)
                    </span>
                  )}
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-x-2">
                    <Link href={`/admin/products/${productId}/edit`}>
                      <IconButton actionType="edit" />
                    </Link>

                    <DeleteProduct productId={productId} />

                    <Link
                      href={`/products/${productId}`}
                      className="text-xs text-muted-foreground underline"
                    >
                      Vis i butikk
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}

function DeleteProduct({ productId, name }: { productId: string; name: string }) {
  const deleteProduct = deleteProductAction.bind(null, { productId });

  return (
    <FormContainer action={deleteProduct}>
      <IconButton
        actionType="delete"
        confirmMessage={`Er du sikker på at du vil slette "${name}"? Dette kan ikke angres.`}
      />
    </FormContainer>
  );
}

export default ItemsPage;