import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function ConfirmEmail() {
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:3001/confirm-email?token=${token}`)
        .then(() => {
          router.push("/login");
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [token]);

  return <div>Confirming your email...</div>;
}
