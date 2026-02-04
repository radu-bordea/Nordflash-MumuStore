# start the project
- npx create-next-app@latest nordflash-mumustore

# shadcn
- 
- npx shadcn@latest init 
- npx shadcn@latest add button
- npx shadcn@latest add button breadcrumb 
- npx shadcn@latest add card checkbok dropdown-menu 
- npx shadcn@latest add input label popover 
- npx shadcn@latest add select separator table 
- npx shadcn@latest add textarea sonner skeleton carousel

# libraries
- npm install react-icons
- npm install @radix-ui/react-icons
- npm install next-themes
- npm i use debounce
- npm install @faker-js/faker --save-dev
- npm install zod
- npm install @supabase/supabase-js
- npm i react-share

# prisma
- npm install prisma tsx @types/pg --save-dev
- npm install @prisma/client @prisma/adapter-pg dotenv pg
- npx prisma init --db --output ../app/generated/prisma

- npx prisma migrate dev --name init
- npx prisma db push
- npx prisma generate

- npx prisma db seed
- npx prisma studio
- npx prisma db push // after added Favorite modul and relation with Product

# clerk
- npm install @clerk/nextjs