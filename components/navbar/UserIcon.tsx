import { LuUser } from "react-icons/lu";
import { currentUser, auth } from "@clerk/nextjs/server";
import Image from "next/image";

async function UserIcon() {
  // const { userId } = auth();

  const user = await currentUser();

  const profileImage = user?.imageUrl;

  if (profileImage) {
    return (
      <Image
        src={profileImage}
        alt="profile image"
        width={24}
        height={24}
        className="rounded-full object-cover"
      />
    );
  }

  return (
    <div>
      <LuUser className="w-6 h-6 bg-primary rounded-full text-white"></LuUser>
    </div>
  );
}
export default UserIcon;
