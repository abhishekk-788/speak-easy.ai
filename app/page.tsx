import BgGradient from "@/components/common/bg-gradient";
import Banner from "@/components/ui/home/banner";
import Divider from "@/components/ui/home/divider";
import HowItWorks from "@/components/ui/home/howitworks";
import Pricing from "@/components/ui/home/pricing";

export default function Home() {
  return (
    <main
      className="mx-auto w-full inset-0 
    h-full bg-[radial-gradient(#e5e7eb_1px), transparent_1px)]
    [background-size:16px_16px]"
    >
      <BgGradient/>
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
