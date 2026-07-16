import { Suspense } from "react";
import VerifyEmailPage from "@/components/storefront/VerifyEmailPage";

export default function VerifyEmail() {
  return (
    <Suspense>
      <VerifyEmailPage />
    </Suspense>
  );
}
