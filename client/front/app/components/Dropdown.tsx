import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@nextui-org/react";
import Link from "next/link";

export default function AvatarDrop() {
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src=""
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Menú</p>
          </DropdownItem>
          <DropdownItem key="logout" color="danger">
            <Link href="/">Cerrar Sesión</Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
