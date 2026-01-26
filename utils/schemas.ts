import { z} from "zod";

export const productSchema = z.object({
  name: z.string().min(4),
  company: z.string().min(4),
  price: z.coerce.number().int().min(0),
  description: z.string().min(4),
  featured: z.coerce.boolean(),
});
