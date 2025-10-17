import { ChevronRight, Sparkle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BundleCardProps {
  bundle: {
    title: string;
    items: { image: string }[];
    price: number;
    savings: number;
    percent: number;
    dark?: boolean;
  };
}

const BundleCard: React.FC<BundleCardProps> = ({ bundle }) => {
  const maxVisible = 4;
  const visibleItems = bundle.items.slice(0, maxVisible);
  const remainingCount = bundle.items.length - maxVisible;

  // 🎨 Conditional styles
  const bgColor = bundle.dark ? "bg-secondary-dark" : "bg-primary-dark";
  const textColor = bundle.dark ? "text-black" : "text-white";
  const borderColor = bundle.dark ? "border-black" : "border-white";
  const shadow = bundle.dark
    ? "shadow-[0px_18px_34.5px_0px_#FFBD1554]"
    : "shadow-[0px_15px_28px_0px_#9DFFF4]";

  // ⬅️ Chevron opposite color scheme
  const chevronBg = bundle.dark ? "bg-primary-dark" : "bg-secondary";
  const chevronColor = bundle.dark ? "text-white" : "text-black";

  return (
    <div
      className={`w-full h-auto p-4 rounded-xl ${shadow} ${bgColor}`}
    >
      <h5 className={`text-xl font-medium ${textColor}`}>{bundle.title}</h5>

      <div className="flex items-center mt-4">
        {visibleItems.map((item, i) => (
          <div
            key={i}
            className={`${i !== 0 ? "-ml-3" : ""} w-10 h-10 rounded-full border-2 ${borderColor} overflow-hidden`}
          >
            <Image
              src={item.image}
              alt="product"
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
            <Sparkle size={16} /> ${bundle.price} /mo
          </p>
          <small className={textColor}>
            Save ${bundle.savings} ({bundle.percent}%)
          </small>
        </div>
        <Link href='/bundles/1' >
          <span
            className={`w-10 h-10 rounded-full flex items-center justify-center ${chevronBg}`}
          >
            <ChevronRight className={`transform rotate-300 ${chevronColor}`} />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default BundleCard;
