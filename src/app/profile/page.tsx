"use client"
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
export default function Profile() {
    const [data, setData] = useState("");

    const getData = async () => {
        const res = await axios.post("/api/users/me");
        console.log(res);
        setData(res.data.data._id)
    }
    return (
        <div className="flex flex-col items-center justify-center p-4 rounded-lg text-center">
            <h1 className="text-xl font-bold">Profile</h1>
            <Link href={`/profile/${data}`} className="text-blue-500 hover:underline">
                <h2 className="text-lg font-semibold">{data}</h2>
            </Link>
            <button
                onClick={getData}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                getData
            </button>
        </div>

    );
}