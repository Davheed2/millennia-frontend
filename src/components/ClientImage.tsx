"use client";

import Image from "next/image";

export default function ClientImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="relative h-[400px] w-full rounded-xl overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
        <p>Loading...</p>
      </div>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        onLoadingComplete={(img) => {
          img.parentElement?.querySelector("div")?.remove();
        }}
      />
    </div>
  );
}
