import { z, ZodType } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Navnet må være minst 2 tegn.",
    })
    .max(100, {
      message: "Navnet må være mindre enn 100 tegn.",
    }),
  company: z.string(),
  featured: z.coerce.boolean(),
  price: z.coerce.number().int().min(0, {
    message: "Prisen må være et positivt tall.",
  }),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(" ").length;
      return wordCount >= 10 && wordCount <= 1000;
    },
    {
      message: "Beskrivelsen må være mellom 10 og 1000 ord.",
    },
  ),
});

export function validateWithZodSchema<T>(schema: ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.issues.map((issue) => issue.message);
    throw new Error(errors.join(", "));
  }

  return result.data;
}

export const imageSchema = z.object({
  image: validateImageFile(),
});

function validateImageFile() {
  const maxUploadSize = 1024 * 1024;
  const acceptedFileTypes = ["image/"];
  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize;
    }, "Filstørrelsen må være mindre enn 1 MB")
    .refine((file) => {
      return (
        !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
      );
    }, "Filen må være et bilde");
}

export const reviewSchema = z.object({
  productId: z.string().refine((value) => value !== '', {
    message: "Produkt-ID kan ikke være tom",
  }),
  authorName: z.string().refine((value) => value !== '', {
    message: "Forfatternavn kan ikke være tomt",
  }),
  authorImageUrl: z.string().refine((value) => value !== '', {
    message: "URL til forfatterbilde kan ikke være tom",
  }),
  rating: z.coerce
    .number()
    .int()
    .min(1, { message: "Vurderingen må være minst 1" })
    .max(5, { message: "Vurderingen kan være maks 5" }),
  comment: z
    .string()
    .min(10, { message: "Kommentaren må være minst 10 tegn lang" })
    .max(1000, { message: "Kommentaren kan være maks 1000 tegn lang" }),
});
