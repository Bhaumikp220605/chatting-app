"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import fetchApi from "@/utils/helper";
import Constants from "@/config/api";
import Modal from "react-modal";

// Modal.setAppElement("#root");

export default function GroupsList() {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [modalType, setModalType] = useState(null);
    const [groupName, setGroupName] = useState("");
    const router = useRouter();

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            const response = await fetchApi({
                url: Constants.API_ENDPOINTS.GET_GROUP,
                method: "GET",
                isAuthRequired: true,
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!groupName.trim()) return;

        const apiEndpoint = modalType === "join" ? Constants.API_ENDPOINTS.JOIN_GROUP : Constants.API_ENDPOINTS.CREATE_GROUP;

        try {
            const response = await fetchApi({ 
                url: apiEndpoint,
                method: "POST",
                isAuthRequired: true,
                data: { name: groupName },
            });

            if (response.status === 200) {
                fetchGroups();
                setModalType(null);
                setGroupName("");
            } else {
                alert(response.message || "Something went wrong!");
            }
        } catch (err) {
            alert("Request failed, try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6" id="root">
            <h2 className="text-2xl font-bold mb-4">Your Groups</h2>

            <div className="flex space-x-4 mb-6">
                <button
                    onClick={() => setModalType("join")}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
                >
                    Join Group
                </button>
                <button
                    onClick={() => setModalType("create")}
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

            {/* Modal for Join/Create Group */}
            <Modal
                isOpen={modalType !== null}
                onRequestClose={() => setModalType(null)}
                className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20"
                // overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <h2 className="text-xl font-semibold mb-4">{modalType === "join" ? "Join a Group" : "Create a Group"}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        placeholder="Enter group name"
                        className="w-full p-2 border rounded-md mb-4 focus:outline-none"
                    />
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={() => setModalType(null)}
                            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            {modalType === "join" ? "Join" : "Create"}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
