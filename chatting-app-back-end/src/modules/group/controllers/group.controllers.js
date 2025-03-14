const { errorResponse, successResponse } = require("../../../helpers/http-response");
const Group = require("../../../models/group.model");
const Messages = require("../../../models/message.model");

const createNewGroup = async (req, res) => {
    try {
        const { name, groupIcon } = req.body;
        const check = await Group.findOne({ name });
        if (check) errorResponse(res, "GROUP_EXIST")

        const newGroup = await Group.create({ name, admin: req.user.id, members: [req.user.id], groupIcon });
        await Messages.create({ groupId: newGroup._id, messages: [] })

        successResponse({ res, message: "Group created successfully" })
    } catch (error) {
        errorResponse(res);
    }
}

const getGroups = async (req, res) => {
    try {
        const allGroup = await Group.find({});
        const filterGroups = allGroup.filter(g => g.members.includes(req.user.id) && g)
        successResponse({ res, message: "Groups fetched successfully", data: filterGroups });
    } catch (error) {
        errorResponse(res);
    }
}

const getGroupById = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);

        successResponse({ res, message: "Groups fetched successfully", data: group });
    } catch (error) {
        errorResponse(res);
    }
}

module.exports = {
    createNewGroup, getGroups, getGroupById
}