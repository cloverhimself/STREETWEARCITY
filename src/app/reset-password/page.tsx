import { Suspense } from "react";
import ResetPasswordPage from "@/components/storefront/ResetPasswordPage";

export default function ResetPassword() {
  return (
    <Suspense>
      <ResetPasswordPage />
    </Suspense>
  );
}
