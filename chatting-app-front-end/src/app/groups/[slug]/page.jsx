"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import fetchApi from "@/utils/helper";
import Constants from "@/config/api";
import { io } from "socket.io-client";

const GetGroupMessage = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const { slug } = useParams();
    const [messages, setMessages] = useState([]);
    const [groupInfo, setGroupInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);
    const socketRef = useRef(null);

    useEffect(() => {
        fetchMessages();

        const socket = io(process.env.NEXT_PUBLIC_BASE_URL, {
            transports: ["websocket"],
            reconnectionAttempts: 5,
        });

        socketRef.current = socket;
        socket.emit("joinGroup", slug);

        socket.on("newMessage", (message) => {
            setMessages((prev) => {
                const lastMessage = prev[prev.length - 1];
                return lastMessage?._id === message._id ? prev : [...prev, message];
            });
            scrollToBottom();
        });

        socket.on("connect_error", (err) => {
            console.error("Socket connection error:", err);
            setError("Failed to connect to chat. Please try again.");
        });

        return () => {
            socket.disconnect();
        };
    }, [slug]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchMessages = async () => {
        try {
            const response = await fetchApi({
                url: `${Constants.API_ENDPOINTS.GET_MESSAGE}/${slug}`,
                method: "GET",
                isAuthRequired: true,
            });

            if (response.status === 200) {
                setMessages(response.data.messages);
                setGroupInfo(response.data.groupId);
            } else {
                setError(response.message || "Failed to fetch messages.");
            }
        } catch (err) {
            setError("Something went wrong!");
        }
        setLoading(false);
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !socketRef.current) return;

        const messageData = {
            groupId: slug,
            content: newMessage,
            sender: userData._id,
        };

        socketRef.current.emit("sendMessage", messageData);
        setNewMessage("");
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="h-screen w-full flex flex-col bg-gray-100">
            {/* Group Header */}
            {groupInfo && (
                <div className="flex items-center bg-white p-4 shadow-md">
                    <img src={groupInfo.groupIcon} alt={groupInfo.name} className="w-12 h-12 rounded-full mr-4" />
                    <h2 className="text-xl font-bold">{groupInfo.name}</h2>
                </div>
            )}

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {loading && <p className="text-gray-600">Loading messages...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {messages.length > 0 ? (
                    messages.map((msg) => {
                        const isUserMessage = msg.sender._id === userData._id;
                        return (
                            <div key={msg._id} className={`flex ${isUserMessage ? "justify-end" : "justify-start"}`}>
                                <div className={`p-3 rounded-lg max-w-xs shadow-md ${isUserMessage ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-black"}`}>
                                    <span className="text-sm font-semibold">{isUserMessage ? "You" : msg.sender.user_name}</span>
                                    <p>{msg.content}</p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-gray-500 text-center">No messages yet.</p>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={sendMessage} className="w-full bg-white p-3 flex items-center shadow-md">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-2 border rounded-md focus:outline-none"
                />
                <button
                    type="submit"
                    className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default GetGroupMessage;
