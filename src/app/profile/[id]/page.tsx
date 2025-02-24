"use client";

import axios from "axios";
import { useRouter, useParams } from "next/navigation";

export default function UserParams() {
    const router = useRouter();
    const params = useParams(); // No need for `use()`

    const logOut = async () => {
        const res = await axios.get("/api/users/logout");
        console.log(res);
        router.push("/login");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold">User Details</h1>
            <h3 className="mt-2 text-xl text-blue-600">{params.id}</h3>
            <button
                onClick={logOut}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
            >
                Logout
            </button>
        </div>
    );
}
