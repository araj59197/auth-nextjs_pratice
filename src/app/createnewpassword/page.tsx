"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function CreateNewPagePage() {
    const [password, setPassword] = React.useState({
        password: "",
    })
    const router = useRouter();
    const onLogin = async () => {
        try {
            const response = await axios.post("/api/users/createnewpass", password);
            toast.success("Create new pass");
            // await axios.get('/api/users/logout')
            router.push("/login");
        } catch (error: any) {
            console.log("Create new pass failed", error.message);
            toast.error(error.message);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <label htmlFor="password">password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value={password.password}
                onChange={(e) => setPassword({ ...password, password: e.target.value })}
                placeholder=""
            />
            <button
                onClick={onLogin}
                className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">
                Reset
            </button>
        </div>
    )
}