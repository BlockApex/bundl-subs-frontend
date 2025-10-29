"use client";
import { useBundleStore } from "@/app/store/bundleStore";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Input from "@/app/components/common/Input";
import Shades from "@/app/components/common/Shades";
import { Button } from "@/app/components/common/Button";
import toast from "react-hot-toast";
import { createBundle } from "@/app/services/bundle.service";
import { CreateBundleRequest } from "@/app/types/bundle.types";

// ---------- TYPES ----------


// ---------- COMPONENT ----------
const ReviewPage = () => {
  const router = useRouter();
  const { bundle, clearBundle } = useBundleStore();

  const [name, setName] = useState("");
  const [shade, setShade] = useState("");
  const [loading, setLoading] = useState(false);

  if (!bundle) {
    return (
      <main className="w-full min-h-screen flex items-center justify-center p-4">
        <div className="w-full h-auto p-4 max-w-xl mx-auto rounded-xl border border-dashed border-gray-400 flex items-center justify-between">
          <p>Build Your Bundle First</p>
          <button
            onClick={() => router.push("/create")}
            className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center hover:bg-primary-100 transition"
          >
            <ChevronRight />
          </button>
        </div>
      </main>
    );
  }

  // ---------- CREATE BUNDLE HANDLER ----------
  const handleCreateBundle = async () => {
    if (!name.trim()) {
      toast.error("Please enter a name for your bundle.");
      return;
    }
    if (!shade) {
      toast.error("Please choose a color shade.");
      return;
    }

    const data: CreateBundleRequest = {
      name: name.trim(),
      description: "A bundle to supercharge your screen life.", // static for now
      color: shade,
      selectedPackages: bundle.packages.map((pkg) => ({
        service: pkg.service._id,
        package: pkg.package._id,
      })),
    };

    try {
      setLoading(true);
      const response = await createBundle(data);
      console.log(response)
      toast.success("Bundle created successfully!");
      router.push(`/payment/${response?._id}`)
      setTimeout(()=>{
              clearBundle();
      },1000)
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || "Failed to create bundle");
      } else {
        console.error("Unknown error:", err);
        toast.error("Bundle creation failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full min-h-screen relative overflow-hidden pb-12">
      {/* ---------- HEADER ---------- */}
      <section className="w-full bg-primary-dark rounded-b-xl px-4 py-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center hover:bg-primary-100 transition"
          >
            <ChevronLeft />
          </button>
          <div>
            <h5 className="text-xl font-normal text-white">Review Your Bundle</h5>
          </div>
        </div>

        <div className="w-full flex items-start justify-between mt-4 max-w-full lg:max-w-lg mx-auto">
          <div className="flex flex-col">
            <small className="text-white">You Pay</small>
            <div className="flex items-center gap-4 mt-1">
              <p className="text-white font-normal text-base line-through">
                ${bundle.totalOriginalPrice.toFixed(2)}
              </p>
              <p className="text-white font-semibold text-base">
                ${bundle.totalFirstDiscountedPrice.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <small className="text-white">You Save</small>
            <div className="flex items-center gap-4 mt-1">
              <p className="text-white font-semibold text-base">
                ${(bundle.totalOriginalPrice - bundle.totalFirstDiscountedPrice).toFixed(2)}
                <small className="ms-1">
                  (
                  {(
                    ((bundle.totalOriginalPrice - bundle.totalFirstDiscountedPrice) /
                      bundle.totalOriginalPrice) *
                    100
                  ).toFixed(0)}
                  %)
                </small>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- BUNDLE DETAILS ---------- */}
      <section className="w-full mt-4 p-4">
        <Input
          value={name}
          onChange={(v) => setName(v)}
          label="Name Your Bundle"
          placeholder="Bundle Name"
        />
        <Shades setShade={(s) => setShade(s)} shade={shade} />
      </section>

      <section className="w-full p-4">
        <div className="flex flex-col gap-4">
          {bundle.packages.map((pkgItem) => {
            const { service, package: pkg, applicableOffers } = pkgItem;
            const discountOffer = applicableOffers.find((o) => o.type === "%discount");
            const freeOffer = applicableOffers.find((o) => o.type === "free");

            return (
              <div
                key={service._id}
                className="w-full relative border border-gray-300 px-3 py-4 rounded-xl"
              >
                <div className="w-full h-full flex items-start justify-between gap-4">
                  <Image
                    src={service.logo}
                    alt={service.name}
                    width={50}
                    height={50}
                    className="rounded-lg"
                  />

                  <div className="w-full">
                    <h6 className="text-md font-normal text-black">{service.name}</h6>
                    <p className="text-sm text-foreground font-normal line-clamp-2">
                      {service.description}
                    </p>

                    <div className="flex items-center gap-2 my-2 flex-wrap">
                      {service.category && (
                        <span className="px-3 py-1 text-foreground text-sm bg-gray-200 rounded-lg capitalize">
                          {service.category}
                        </span>
                      )}

                      {discountOffer && (
                        <span className="px-3 py-1 text-primary text-xs bg-primary/20 rounded-lg">
                          {discountOffer.amount}% off
                        </span>
                      )}
                      {freeOffer && (
                        <span className="px-3 py-1 text-green-600 text-xs bg-green-100 rounded-lg">
                          {freeOffer.period} Free Trial
                        </span>
                      )}
                    </div>

                    {pkg && (
                      <div className="flex items-center gap-2">
                        <p className="text-base font-normal text-black">
                          ${pkg.amount.toFixed(2)}/{pkg.frequency}
                        </p>
                        <p className="text-sm text-foreground">• {pkg.name}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------- SUBMIT BUTTON ---------- */}
      <section className="relative flex items-center justify-center px-4">
        <Button
          onClick={handleCreateBundle}
          variant="dark"
          size="full"
          disabled={loading}
          className="flex items-center gap-2 mt-6 fixed bottom-4 max-w-[90%] lg:max-w-2xl"
          loading={loading}
        >
          Continue to Payment <ChevronRight size={18} />
        </Button>
      </section>
    </main>
  );
};

export default ReviewPage;
