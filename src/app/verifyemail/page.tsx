"use client"
import axios from "axios";
import { error } from "console";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter()
  const verifyEmail = async () => {
    try {
      setLoading(true);
      const respons = await axios.post("/api/users/verifyemail", { token });
      console.log("email verification success", respons.data);

      setVerified(true);
      setLoading(false);
      setError(false);
      router.push("/login");
    } catch (error) {
      setLoading(false);
      setVerified(false);
      setError(true);
      console.log("email verification failed");
    }
  }
  useEffect(() => {
    const tokens = window.location.search.split("=")[1];
    setToken(tokens);

  }, [])
  return (<>
    <div className="flex flex-col items-center justify-center p-6 rounded-lg ">
      <h2 className={`text-xl font-semibold ${verified ? "text-green-600" : "text-red-600"}`}>
        {verified ? "Verified" : "Click to Verify"}
      </h2>
      {token && <h3 className="text-gray-700 text-sm mt-2">{token}</h3>}
      {error && <h3 className="text-red-600 text-sm mt-2">error</h3>}
      <button
        type="button"
        onClick={verifyEmail}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        {loading ? "loading..." : "Click to Verify"}
      </button>
    </div>

  </>);
}
