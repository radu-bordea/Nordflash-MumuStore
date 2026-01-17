import Container from "../global/Container";
import CartButton from "./CartButton";
import { DarkMode } from "./DarkMode";
import LinksDropdown from "./LinksDropdown";
import Logo from "./Logo";
import NavSearch from "./NavSearch";

function Navbar() {
  return (
    <div className="border-b">
      <Container className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center flex-wrap gap-6 py-8">
        <div className="flex gap-4 justify-center">
          <Logo />
          <NavSearch />
        </div>
        <div className="flex gap-4 items-center justify-end">
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
