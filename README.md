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
- npm install next-themes

# prisma
- npm install prisma tsx @types/pg --save-dev
- npm install @prisma/client @prisma/adapter-pg dotenv pg
- npx prisma init --db --output ../app/generated/prisma

- npx prisma migrate dev --name init
- npx prisma db push
- npx prisma generate

- npx prisma db seed
- npx prisma studio