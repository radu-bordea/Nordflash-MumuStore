import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
});

const userData: Prisma.ProductCreateInput[] = [
  {
    "name": "HydraGlow Daily Moisturizer",
    "company": "DermaLux",
    "description": "A lightweight daily face cream designed to deeply hydrate and restore the skin barrier. Infused with hyaluronic acid and vitamin B5, it leaves skin soft, plump, and radiant without clogging pores. Suitable for all skin types, including sensitive skin.",
    "featured": true,
    "image": "https://images.pexels.com/photos/5928039/pexels-photo-5928039.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "price": 45,
    "clerkId": "clerkId"
  },
  {
    "name": "Renewal Night Repair Cream",
    "company": "SkinRevive",
    "description": "A rich overnight cream formulated to support skin renewal while you sleep. Powered by peptides and ceramides, it helps improve elasticity, smooth fine lines, and strengthen the skin’s natural repair process.",
    "featured": true,
    "image": "https://images.pexels.com/photos/4046316/pexels-photo-4046316.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "price": 60,
    "clerkId": "clerkId"
  },
  {
    "name": "Calm & Soothe Barrier Cream",
    "company": "PureDerm",
    "description": "A soothing cream developed to calm irritated or stressed skin. Enriched with centella asiatica and oat extract, it reduces redness and reinforces the skin barrier, making it ideal for post-treatment or sensitive skin routines.",
    "featured": false,
    "image": "https://images.pexels.com/photos/4046314/pexels-photo-4046314.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "price": 38,
    "clerkId": "clerkId"
  },
  {
    "name": "BrightBalance Vitamin C Cream",
    "company": "Luminé",
    "description": "A brightening face cream infused with stabilized vitamin C to even skin tone and enhance natural glow. Regular use helps reduce dullness and the appearance of dark spots while providing long-lasting hydration.",
    "featured": false,
    "image": "https://images.pexels.com/photos/6663469/pexels-photo-6663469.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "price": 52,
    "clerkId": "clerkId"
  }
]


export async function main() {
  for (const u of userData) {
    await prisma.product.create({ data: u });
  }
}

main();