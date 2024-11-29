"use client"
import { useState, useEffect } from "react";
import { ArrowRight, CheckIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "../button";
import { ORIGIN_URL, plansMap } from "@/lib/constants";
import { checkUserSubscription } from "@/lib/payment-helper";

export default function Pricing() {
  const [userPlan, setUserPlan] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the current user's subscription plan
    const fetchSubscription = async () => {
      const plan = await checkUserSubscription();
      setUserPlan(plan as string | null);
    };

    fetchSubscription();
  }, []);

  return (
    <section className="relative overflow-hidden" id="pricing">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-12 lg:px-0">
        <div className="flex items-center justify-center w-full pb-12">
          <h2 className="font-bold text-xl uppercase mb-8 text-purple-600">
            Pricing
          </h2>
        </div>
        <div className={cn(
          "relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8"
        )}>
          {plansMap.map(
            ({ name, price, description, items, id, paymentLink }, idx) => (
              <div className="relative w-full max-w-lg" key={idx}>
                <div
                  className={cn(
                    "relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 rounded-box border-[1px] border-gray-500/20 rounded-2xl",
                    id === userPlan && "border-violet-500 gap-5 border-2 bg-purple-50" // Apply style if this is the user's current plan
                  )}
                >
                  <div className="flex justify-between items-center gap-4">
                    <div>
                      <p className="text-lg lg:text-xl font-bold capitalize">
                        {name}
                      </p>
                      <p className="text-base-content/80 mt-2">{description}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <p className="text-5xl tracking-tight font-extrabold">
                      ₹ {price}
                    </p>
                    <div className="flex flex-col justify-end mb-[4px]">
                      <p className="text-xs text-base-content/60 uppercase font-semibold">
                        USD
                      </p>
                      <p className="text-xs text-base-content/60">/month</p>
                    </div>
                  </div>
                  <ul className="space-y-2.5 leading-relaxed text-base flex-1">
                    {items.map((item, idx) => (
                      <li className="flex items-center gap-2" key={idx}>
                        <CheckIcon size={18} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="space-y-2">
                    <Button
                      variant={"link"}
                      className={cn(
                        "border-2 rounded-full flex gap-2 bg-black text-gray-100",
                        id === "pro" && "border-amber-300 px-4"
                      )}
                      disabled={(id === userPlan)}
                    >
                      <Link
                        href={`${paymentLink}?success_url=${encodeURIComponent(
                          `${ORIGIN_URL}/?status=success`
                        )}&cancel_url=${encodeURIComponent(
                          `${ORIGIN_URL}/?status=cancel`
                        )}`}
                        className="flex gap-1 items-center"
                      >
                        Get SpeakEasy <ArrowRight size={18} />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
