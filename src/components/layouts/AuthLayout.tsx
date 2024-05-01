import { useEffect } from "react";
import { redirect } from "next/navigation";
import { validateToken } from "utils/local-storage";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  useEffect(() => {
    const token = validateToken();
    if (token) {
      redirect("/admin");
    }
  }, []);

  return <>{children}</>;
}
