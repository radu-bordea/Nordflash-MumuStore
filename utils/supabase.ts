import { createClient } from "@supabase/supabase-js";

const bucket = "main-bucket";

export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string,
);

export const uploadImage = async (image: File) => {
  // Safe file name: no spaces or special characters like æøå
  const safeName = image.name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-");

  const newName = `${Date.now()}-${safeName}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(newName, image, { cacheControl: "3600" });

  if (error || !data) {
    console.error("Supabase upload error:", error);
    throw new Error(error?.message || "Bildeopplasting mislyktes");
  }

  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};

export const deleteImage = (url: string) => {
  const imageName = url.split("/").pop();
  if (!imageName) throw new Error("Ugyldig nettadresse");
  return supabase.storage.from(bucket).remove([imageName]);
};