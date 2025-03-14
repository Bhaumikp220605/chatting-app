const { verifyToken } = require("../../../middlewares/token");
const Messages = require("../../../models/message.model");
const { getMessage, addMessage } = require("../controllers/messages.controllers");

const messageRoute = async (app, io) => {

    app.get("/get-message/:groupId", verifyToken, getMessage);

    app.post("/get-message", verifyToken, addMessage);

    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);

        // Handle joining a group
        socket.on("joinGroup", (groupId) => {
            socket.join(groupId);
            console.log(`User joined group ${groupId}`);
        });

        // Handle sending a message
        socket.on("sendMessage", async (messageData) => {
            try {
                const updatedMessage = await Messages.findOneAndUpdate(
                    { groupId: messageData.groupId },
                    {
                        $push: {
                            messages: {
                                content: messageData.content,
                                sender: messageData.sender
                            }
                        }
                    },
                    { new: true, upsert: true }
                ).populate("messages.sender", "user_name"); // Populate sender details

                // Extract the latest message
                const latestMessage = updatedMessage.messages[updatedMessage.messages.length - 1];

                // Emit the new message to the group
                io.to(messageData.groupId).emit("newMessage", {
                    _id: latestMessage._id,
                    content: latestMessage.content,
                    sender: {
                        _id: latestMessage.sender._id,
                        user_name: latestMessage.sender.user_name, // Get actual user name
                    },
                });

            } catch (error) {
                console.error("Error sending message:", error);
            }
        });

        // Handle disconnect
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });

}

module.exports = messageRoute;