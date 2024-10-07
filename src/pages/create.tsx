import React from "react";
import { Input } from "@nextui-org/input";

import DefaultLayout from "@/layouts/default";

type temptype = "sm" | "md" | "lg";

export default function CreatePage() {
  const sizes: temptype[] = ["sm", "md", "lg"];

  return (
    <DefaultLayout>
      <section className="flex items-center justify-center gap-4 py-8 md:py-10">
        <div className="flex inline-block max-w-lg text-center justify-center">
          Create Your Connection
        </div>
      </section>
      <div className="w-full flex flex-col gap-4">
        {sizes.map((size) => (
          <div
            key={size}
            className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
          >
            <Input label="Email" size={size} type="email" />
            <Input
              label="Email"
              placeholder="Enter your email"
              size={size}
              type="email"
            />
          </div>
        ))}
      </div>
    </DefaultLayout>
  );
}
