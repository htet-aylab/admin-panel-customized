import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { axiosPost } from "utils/axios";
import { setAuth } from "store/features/auth/auth.slice";
import { deleteLocalStorage, validateToken } from "utils/local-storage";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const dispatch = useDispatch();
  const router = useRouter();

  const authVerify = async (token: string | null) => {
    if (token) {
      await axiosPost(
        "auth/verify",
        { token },
        (res: any) => {
          dispatch(setAuth(res.data));
        },
        () => {
          dispatch(setAuth({}));
          deleteLocalStorage("token").then(() => {
            router.push("/auth/sign-in");
          });
        }
      );
    }
  };

  useEffect(() => {
    const token = validateToken();
    if (!token) {
      router.push("/auth/sign-in");
    }
    authVerify(token);
  }, []); 

  return <>{children}</>;
}
