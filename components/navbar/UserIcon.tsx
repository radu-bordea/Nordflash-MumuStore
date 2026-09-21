import { LuUser } from "react-icons/lu";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

async function UserIcon() {
  const user = await currentUser();

  const profileImage = user?.imageUrl;

  if (profileImage) {
    return (
      <Image
        src={profileImage}
        alt="profile image"
        width={24}
        height={24}
        className="rounded-full object-cover ring-2 ring-gold/70"
      />
    );
  }

  return (
    <div>
      <LuUser className="w-6 h-6 rounded-full bg-gold p-1 text-gold-foreground" />
    </div>
  );
}
export default UserIcon;