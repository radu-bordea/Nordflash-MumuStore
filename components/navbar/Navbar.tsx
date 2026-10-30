import Container from "../global/Container";
import CartButton from "./CartButton";
import { DarkMode } from "./DarkMode";
import LinksDropdown from "./LinksDropdown";
import Logo from "./Logo";
import NavSearch from "./NavSearch";
import { Suspense } from "react";

function Navbar() {
  return (
    <div className="bg-nav text-nav-foreground shadow-md">
      <Container className="flex flex-col gap-2 px-3 pt-3 pb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-8">
        <div className="flex items-center justify-between sm:contents">
          {/* zoom shrinks the whole logo proportionally on phones, so butterfly positions stay identical */}
          <div className="flex shrink-0 gap-2 md:gap-4 justify-center [zoom:0.85] sm:[zoom:1]">
            <Logo />
          </div>
          <div className="flex shrink-0 gap-1.5 sm:gap-2 md:gap-4 items-center justify-end sm:order-3">
            <CartButton />
            {/* desktop/tablet: dark mode here */}
            <div className="hidden sm:block">
              <DarkMode />
            </div>
            <LinksDropdown />
          </div>
        </div>

        {/* phone: search and dark mode share the second row */}
        <div className="flex w-full items-center gap-2 sm:contents">
          <div className="min-w-0 flex-1 sm:mx-4 sm:max-w-md lg:max-w-xl sm:order-2">
            <Suspense>
              <NavSearch />
            </Suspense>
          </div>
          <div className="sm:hidden">
            <DarkMode />
          </div>
        </div>
      </Container>
    </div>
  );
}
export default Navbar;