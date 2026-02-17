import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import SectionTitle from "@/components/global/SectionTitle";
import { fetchUserOrders } from "@/utils/actions";
import { formatCurrency, formatDate } from "@/utils/format";



async function OrdersPage() {
  const orders = await fetchUserOrders();

  return (
    <>
      <SectionTitle text="Dine bestillinger" />
      <Table>
        <TableCaption>Totalt antall bestillinger: {orders.length}</TableCaption>
        <TableHeader>
          <TableRow >
            <TableHead>Produkter</TableHead>
            <TableHead>Totalt beløp</TableHead>
            <TableHead>Avgift</TableHead>
            <TableHead>Frakt</TableHead>
            <TableHead>Dato</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order)=>{
            const {id, products, orderTotal, tax, shipping, createdAt} = order;
            return (
              <TableRow key={id}>
                <TableCell>{products}</TableCell>
                <TableCell>{formatCurrency(orderTotal)}</TableCell>
                <TableCell>{formatCurrency(tax)}</TableCell>
                <TableCell>{formatCurrency(shipping)}</TableCell>
                <TableCell>{formatDate(createdAt)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
export default OrdersPage;
