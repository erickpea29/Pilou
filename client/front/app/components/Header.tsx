import React from "react";
import Image from "next/image";
import { Avatar } from "@nextui-org/react";
import AvatarDrop from "./Dropdown";

const Header = () => {
  return (
    <div className="bg-pink-600 p-4 flex items-center justify-between">
      <div className="w-40 h-12 flex-shrink-0 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          <Image
            src="/Logo.png"
            alt="Logo"
            width={128}
            height={128}
            className="object-contain"
          />
        </div>
      </div>
      <div className="mr-4">
        <AvatarDrop />
      </div>
    </div>
  );
};

export default Header;
