"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const UserLinks = () => {
  const { status } = useSession();
  return (
    <div>
      {status === "authenticated" ? (
        <div>
          <Link href="/orders">Zamówienia</Link>
          <span className="ml-4 cursor-pointer" onClick={() => signOut()}>Wyloguj</span>
        </div>
      ) : (
        <Link href="/login">Zaloguj</Link>
      )}
    </div>
  );
};

export default UserLinks;
