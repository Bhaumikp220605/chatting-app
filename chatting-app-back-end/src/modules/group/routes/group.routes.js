const { verifyToken } = require("../../../middlewares/token")
const { createNewGroup, getGroups, getGroupById } = require("../controllers/group.controllers")

const groupRoutes = (app) => {

    app.post("/create-group", verifyToken, createNewGroup)

    app.get("/get-group", verifyToken, getGroups)

    app.get("/get-group/:id", verifyToken, getGroupById)

}

module.exports = groupRoutes