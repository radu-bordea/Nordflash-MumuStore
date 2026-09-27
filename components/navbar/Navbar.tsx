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
      <Container className="flex flex-col gap-2 pt-3 pb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="flex items-center justify-between sm:contents">
          <div className="flex shrink-0 gap-2 md:gap-4 justify-center">
            <Logo />
          </div>
          <div className="flex shrink-0 gap-2 md:gap-4 items-center justify-end sm:order-3">
            <CartButton />
            <DarkMode />
            <LinksDropdown />
          </div>
        </div>
        <div className="min-w-0 w-full sm:flex-1 sm:mx-4 sm:max-w-md lg:max-w-xl sm:order-2">
          <Suspense>
            <NavSearch />
          </Suspense>
        </div>
      </Container>
    </div>
  );
}
export default Navbar;