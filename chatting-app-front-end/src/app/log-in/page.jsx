"use client"

import { useState } from "react";
import Constants from "@/config/api";
import fetchApi from "@/utils/helper";
import { useRouter } from "next/navigation";

export default function Login() {
    const [user_email, setEmail] = useState("");
    const [user_password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const response = await fetchApi({
            url: Constants.API_ENDPOINTS.LOGIN,
            method: "POST",
            data: { user_email, user_password },
            isAuthRequired: false
        });

        if (response.status === 200) {
            localStorage.setItem("token", response.token);
            localStorage.setItem("userData", JSON.stringify(response.data));
            router.push("/groups");
        } else {
            setError(response?.message || "Login failed!");
        }

        setLoading(false);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={user_email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={user_password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        new user?{" "}
                        <button
                            type="button"
                            onClick={() => router.push("/register")}
                            className="text-blue-600 hover:underline"
                        >
                            Register
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
}
