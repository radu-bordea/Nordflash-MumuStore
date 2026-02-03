import Container from "../global/Container";
import CartButton from "./CartButton";
import { DarkMode } from "./DarkMode";
import LinksDropdown from "./LinksDropdown";
import Logo from "./Logo";
import NavSearch from "./NavSearch";
import { Suspense } from "react";

function Navbar() {
  return (
    <div className="border-b">
      <Container className="flex flex-row  sm:justify-between sm:items-center gap-2 pt-4 pb-4">
        <div className="flex gap-2 md:gap-4 justify-center">
          <Logo />
        </div>
        <Suspense>
          <NavSearch />
        </Suspense>
        <div className="flex gap-2 md:gap-4 items-center justify-end">
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
