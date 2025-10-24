import { Sparkle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { isColorDark, hexToRGBA, lightenColor } from "../utils";
import { Bundle } from "../types/bundle.types";

export interface BundleCardProps {
  bundle: Bundle
}

const BundleCard: React.FC<BundleCardProps> = ({ bundle }) => {
  const maxVisible = 4;
  const visibleItems = bundle.selectedPackages.slice(0, maxVisible);
  const remainingCount = bundle.selectedPackages.length - maxVisible;
  const categories = bundle.selectedPackages.map((p) => p.service?.category)

  // Calculate savings and percent (based on backend fields)
  const savings = bundle.totalOriginalPrice - bundle.totalFirstDiscountedPrice;
  const percent = ((savings / bundle.totalOriginalPrice) * 100).toFixed(1);

  // 🎨 Dynamic color logic
  const isDarkBg = isColorDark(bundle.color);
  const textColor = isDarkBg ? "text-white" : "text-black";
  const borderColor = isDarkBg ? "border-white" : "border-black";
  const shadowColor = hexToRGBA(bundle.color, 0.5);
  const lightBg = lightenColor(bundle.color, 35);

  return (
    <div
      className="w-full h-auto p-4 rounded-xl transition-all duration-300"
      style={{
        backgroundColor: bundle.color,
        boxShadow: `0px 15px 30px ${shadowColor}`,
      }}
    >
      <div className="flex items-center justify-between">
        <h5 className={`text-xl font-medium ${textColor}`}>{bundle.name}</h5>

        <Link href={`/bundles/${bundle._id}`}>
          <span
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: lightBg }}
          >
            <Image src="/assets/arrow.svg" alt="arrow" width={10} height={10} />
          </span>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        {categories.map((c, i) => (
          <span className={`px-3 py-1 text-sm ${textColor} rounded-lg capitalize`}
            key={i}
            style={{ backgroundColor: lightBg }}
          >
            {c}
          </span>
        ))}
      </div>
      <div className="flex items-center mt-4">
        {visibleItems.map((item, i) => (
          <div
            key={i}
            className={`${i !== 0 ? "-ml-3" : ""} w-10 h-10 rounded-full border-2 ${borderColor} overflow-hidden`}
          >
            <Image
              src={item.service.logo}
              alt="service"
              width={40}
              height={40}
              className="object-cover bg-white"
            />
          </div>
        ))}

        {remainingCount > 0 && (
          <p className={`ms-4 text-base font-normal ${textColor}`}>
            +{remainingCount} services
          </p>
        )}
      </div>

      <div className="w-full flex items-baseline justify-between mt-4">
        <div>
          <p className={`text-base font-normal flex items-center gap-2 ${textColor}`}>
            <Sparkle size={16} /> ${bundle.totalFirstDiscountedPrice.toFixed(2)} /{bundle.frequency}
          </p>
          <small className={textColor}>
            Save ${savings.toFixed(2)} ({percent}%)
          </small>
        </div>
      </div>
    </div>
  );
};

export default BundleCard;
