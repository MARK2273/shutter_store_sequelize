"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar(): JSX.Element {
  const pathName = usePathname();
  return (
    <div className="flex gap-5 ">
      <Link href="/" className={`${pathName === "/" ? "border-2 border-blue-500 p-2 rounded-md" : "p-2"}`}>
        Shutter Form
      </Link>
      <Link href="/list" className={`${pathName === "/list" ? "border-2 border-blue-500 p-2 rounded-md" : "p-2"}`}>Customers List</Link>
    </div>
  );
}
