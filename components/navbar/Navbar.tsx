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
      <Container className="flex flex-row justify-between items-center gap-2 sm:gap-4 pt-3 pb-3">
        <div className="flex shrink-0 gap-2 md:gap-4 justify-center">
          <Logo />
        </div>
        <div className="min-w-0 flex-1 sm:mx-4 sm:max-w-md lg:max-w-xl">
          <Suspense>
            <NavSearch />
          </Suspense>
        </div>
        <div className="flex shrink-0 gap-2 md:gap-4 items-center justify-end">
          {/* Future nav items can go here */}
          <CartButton />
          <DarkMode />
          <LinksDropdown />
        </div>
      </Container>
    </div>
  );
}
export default Navbar;