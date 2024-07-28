"use client";

import { AmountProvider } from "@/contexts/AmountContext";
import ShutterForm from "@/components/ShutterForm";
import { Suspense } from "react";

export default function page(): JSX.Element {
  return (
    <div className="w-full p-5">
      <AmountProvider>
        <Suspense>
          <ShutterForm />
        </Suspense>
      </AmountProvider>
    </div>
  );
}
