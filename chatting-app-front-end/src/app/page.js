"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = new useRouter();

  useEffect(() => {
    router.push("/log-in");
  }, [])

  return (
    <>
    </>
  );
}
