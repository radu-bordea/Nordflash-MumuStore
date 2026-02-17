"use client";
import { toast } from "sonner";

import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

function SignOutLink() {
  const handleLogout = () => {
    toast.success("Logget ut")
  };

  return (
    <SignOutButton> 
      <Link href="/" className="w-full text-left" onClick={handleLogout}>Logg ut</Link>
    </SignOutButton>
    
  );
}
export default SignOutLink;
