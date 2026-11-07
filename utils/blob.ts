import { put, del } from "@vercel/blob";

export const uploadImage = async (image: File) => {
  const safeName = image.name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-");

  const blob = await put(`products/${Date.now()}-${safeName}`, image, {
    access: "public",
    addRandomSuffix: true,
  });
  return blob.url;
};

export const deleteImage = async (url: string) => {
  if (!url.includes("blob.vercel-storage.com")) return;
  try {
    await del(url);
  } catch (error) {
    console.error("Kunne ikke slette bilde:", error);
  }
};