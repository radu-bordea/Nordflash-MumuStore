"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { error } from "console";
import { redirect } from "next/navigation";
import { productSchema } from "./schemas";

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) redirect("/");
  return user;
};

const renderError = (
  error: unknown,
): {
  message: string;
} => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : "An error occured",
  };
};

export const fetchFeaturedProducts = async () => {
  const products = await prisma.product.findMany({
    where: {
      featured: true,
    },
  });
  return products;
};

export const fetchAllProducts = async ({ search = "" }: { search: string }) => {
  return prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const fetchSingleProduct = async (productId: string) => {
  if (!productId) redirect("/products");

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) redirect("/products");

  return product;
};

export const createProductAction = async (
  prevState: unknown,
  formData: FormData,
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData)
    const validatedFields = productSchema.parse(rawData)

    return { message: "product created" };
  } catch (error) {
    return renderError(error);
  }
};
