"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import fetchApi from "@/utils/helper";
import Constants from "@/config/api";

export default function GroupsList() {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            const response = await fetchApi({
                url: Constants.API_ENDPOINTS.GET_GROUP, // Replace with actual API URL
                method: "GET",
                isAuthRequired: true, // If auth is required
            });

            if (response.status === 200) {
                setGroups(response.data);
            } else {
                setError(response.message || "Failed to fetch groups.");
            }
        } catch (err) {
            setError("Something went wrong!");
        }
        setLoading(false);
    };

    // const openGroupChat = (groupId) => {
    //     router.push(`/group/${groupId}`);
    // };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <h2 className="text-2xl font-bold mb-4">Your Groups</h2>

            {/* Buttons for Joining & Creating Groups */}
            <div className="flex space-x-4 mb-6">
                <button
                    // onClick={() => router.push("/join-group")}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
                >
                    Join Group
                </button>
                <button
                    // onClick={() => router.push("/create-group")}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Create Group
                </button>
            </div>

            {loading && <p className="text-gray-600">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="w-full max-w-lg space-y-4">
                {groups.map((group) => (
                    <div key={group._id} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                        <div className="flex items-center">
                            <img src={group.groupIcon} alt={group.name} className="w-12 h-12 rounded-full mr-4" />
                            <div>
                                <h3 className="text-lg font-semibold">{group.name}</h3>
                                <p className="text-sm text-gray-600">Members: {group.members.length}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => router.push(`/groups/${group._id}`)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Open Group
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
