import { ImHappy } from "react-icons/im";
import { Button } from "../ui/button";
import Link from "next/link";

function Logo() {
  return (
    <Button asChild variant="outline" className="rounded-full px-3 py-1" size="icon">
      <Link href="/">
        <ImHappy className="h-4 w-4 text-cyan-600" />
      </Link>
    </Button>
  )
}
export default Logo