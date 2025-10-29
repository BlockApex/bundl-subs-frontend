"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import AppLayout from "@/app/components/common/AppLayout";
import { MyBundle } from "@/app/types/bundle.types";
import { getMyBundles } from "@/app/services/bundle.service";
import toast from "react-hot-toast";
import BundleCard from "@/app/components/BundleCard";
import { Spinner } from "@/app/components/common/Spinner";
import { isSubscription } from "@/app/utils";

const statuses = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "paused", label: "Paused" },
  { id: "grace", label: "In Grace Period" },
  { id: "cancelled", label: "Cancelled" },
];

const ActiveBundles = () => {
  const [status, setStatus] = useState(statuses[0]);
  const [bundles, setBundles] = useState<MyBundle[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBundles = async () => {
      try {
        setLoading(true);
        const data = await getMyBundles();
        setBundles(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message || "Failed to fetch bundles");
        } else {
          toast.error("Failed to fetch bundles");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBundles();
  }, []);

  // ✅ Filter bundles based on status
  const filteredBundles = useMemo(() => {
    if (!bundles) return [];
    if (status.id === "all") return bundles;

    // some bundles may not have a `status` field
    return bundles.filter(
      (b) => isSubscription(b) && b.status && b.status.toLowerCase() === status.id.toLowerCase()
    );
  }, [bundles, status]);

  return (
    <AppLayout showTopbar={false}>
      <main className="w-full min-h-screen relative overflow-hidden p-4">
        <h5 className={`text-xl font-normal text-black`}>My Bundles</h5>

        <div className="flex items-center justify-between">
          <div></div>
          <Link href="/create" className="text-base text-primary">
            + Add More
          </Link>
        </div>

        {/* Status Filter Buttons */}
        <div className="w-full flex gap-3 items-center overflow-x-auto hide-scrollbar mt-4">
          {statuses.map((s) => (
            <button
              key={s.id}
              onClick={() => setStatus(s)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl border transition-all ${
                s.id === status.id
                  ? "bg-primary/60 border-primary text-black"
                  : "border-black text-black hover:bg-primary/20"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Bundles List */}
        <div className="w-full h-[650px] lg:[500px] overflow-y-scroll flex flex-col gap-8 mt-4 p-2">
          {loading ? (
            <div className="flex items-center justify-center">
              <Spinner />
            </div>
          ) : filteredBundles.length > 0 ? (
            filteredBundles.map((b, i) => <BundleCard bundle={b} key={i} />)
          ) : (
            <div className="text-center text-gray-500 mt-8">
              No {status.label.toLowerCase()} bundles found.
            </div>
          )}
        </div>
      </main>
    </AppLayout>
  );
};

export default ActiveBundles;
