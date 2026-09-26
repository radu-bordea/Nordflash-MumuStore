import prisma from "@/lib/prisma";

export const fulfillOrder = async (orderId: string, cartId: string) => {
  await prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({ where: { id: orderId } });
    if (!order || order.isPaid) return;

    const cart = await tx.cart.findUnique({
      where: { id: cartId },
      include: { cartItems: { include: { product: true } } },
    });
    if (!cart) return;

    for (const item of cart.cartItems) {
      const isPreorderItem =
        item.product.stock === 0 && item.product.allowPreorder;

      // Preorder items have no stock to decrement — skip the check entirely.
      if (isPreorderItem) continue;

      const result = await tx.product.updateMany({
        where: { id: item.productId, stock: { gte: item.amount } },
        data: { stock: { decrement: item.amount } },
      });
      if (result.count === 0) {
        throw new Error(`Produkt ${item.product.name} er utsolgt`);
      }
    }

    await tx.order.update({
      where: { id: orderId },
      data: { isPaid: true },
    });
    await tx.cart.delete({ where: { id: cartId } });
  });
};