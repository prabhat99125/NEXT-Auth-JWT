"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [buttondisabled, setButtonDisabled] = useState(false);

  const onSingup = async () => {
    try {
      setLoading(true);
      setButtonDisabled(true);
      const respons = await axios.post("/api/users/signup", userData);
      console.log("singup success", respons.data);
      setLoading(false);
      toast.success("singup success");
      router.push("/login");
      setButtonDisabled(false);

    } catch {
      console.log("singup failed");
      toast.error("singup failed");
      setLoading(false);
      setButtonDisabled(false);

    }
  }
  useEffect(() => {
    if (userData.username.length > 0 && userData.email.length > 0 && userData.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [userData])
  return (<>
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-80">
        <h1 className="text-2xl font-bold text-center mb-4">
          {loading ? "Processing..." : "Sign Up"}
        </h1>
        <hr className="border-gray-600 mb-4" />

        <input
          className="w-full p-2 mb-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter username"
          type="text"
          value={userData.username}
          onChange={(e) => setUserData({ ...userData, username: e.target.value })}
        />

        <input
          className="w-full p-2 mb-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter email"
          type="email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />

        <input
          className="w-full p-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter password"
          type="password"
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        />

        <button disabled={buttondisabled}  onClick={onSingup}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300"
        >
          {loading ? "Processing..." : "Sign Up"}
        </button>
      </div>
    </div>

  </>);
}
