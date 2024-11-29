"use client";
import BgGradient from "@/components/common/bg-gradient";
import Banner from "@/components/ui/home/banner";
import Divider from "@/components/ui/home/divider";
import HowItWorks from "@/components/ui/home/howitworks";
import Pricing from "@/components/ui/home/pricing";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation"; // Correct import for `useRouter` in Next.js App Directory
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const status = urlParams.get("status");

      if (status === "success") {
        toast({
          title: "Payment successful! 🎉",
          description: "Your payment has been processed successfully.",
          variant: "default",
        });
      } else if (status === "cancel") {
        toast({
          title: "Payment failed!",
          description: "Your payment was unsuccessful.",
          variant: "destructive",
        });
      }

      // Remove the `status` query param from the URL
      router.replace("/");
    }
  }, [router]);

  return (
    <main
      className="mx-auto w-full inset-0 
    h-full bg-[radial-gradient(#e5e7eb_1px), transparent_1px)]
    [background-size:16px_16px]"
    >
      <BgGradient />
      <Banner />
      <Divider />
      <HowItWorks />
      <Divider />
      <Pricing />
      <Divider />
      <footer className="bg-gray-200/20 flex h-20 py-24 px-12 z-20 relative overflow-hidden flex-col gap-2">
        <p>All Rights Reserved, {new Date().getFullYear()}</p>
        <a href="https://github.com/abhishekk-788" target="_blank">
          Built by Abhishek 🚀
        </a>
      </footer>
    </main>
  );
}
