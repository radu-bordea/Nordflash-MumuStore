type NavLink = {
  href: string;
  label: string;
};

export const links: NavLink[] = [
  { href: "/", label: "hjem" },
  { href: "/about", label: "om oss" },
  { href: "/products", label: "produkter" },
  { href: "/favorites", label: "favoritter" },
  { href: "/reviews", label: "anmeldelser" },
  { href: "/cart", label: "handlekurv" },
  { href: "/orders", label: "bestillinger" },
  { href: "/admin/sales", label: "dashbord" },
];

export const adminLinks: NavLink[] = [
  { href: "/admin/sales", label: "salg" },
  { href: "/admin/products", label: "mine produkter" },
  { href: "/admin/products/create", label: "opprett produkt" },
];

