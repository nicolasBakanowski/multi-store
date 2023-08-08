import { useRouter } from "next/router";
import { useEffect } from "react";

const Start = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, []);

  return null;
};

export default Start;
