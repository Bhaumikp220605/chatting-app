const { successResponse, errorResponse } = require("../../../helpers/http-response");
const Messages = require("../../../models/message.model")

const getMessage = async (req, res) => {
    try {
        const groupMessage = await Messages.findOne({ groupId: req.params.groupId })
            .populate("groupId")
            .populate("messages.sender", "user_name user_email")

        successResponse({ res, message: "Message fetched successfully", data: groupMessage })
    } catch (error) {
        errorResponse(res)
    }
}

const addMessage = async (req, res) => {
    try {
        const { groupId, content } = req.body;
        const senderId = req.user.id;
        const check = await Messages.findOne({ groupId });
        console.log(check)
        if (!check) errorResponse(res)

        const updatedMessage = await Messages.findOneAndUpdate(
            { groupId },
            { $push: { messages: { content, sender: senderId } } },
            { new: true }
        ).populate("groupId");

        successResponse({ res, message: "Message added successfully", data: updatedMessage })
    } catch (error) {
        console.log(error.message);
        errorResponse(res)
    }
}

module.exports = {
    getMessage, addMessage
}