const { handleLogIn, addNewUser } = require("../controllers/user.controllers");

const userRoute = (app) => {

    app.post("/log-in", handleLogIn)

    app.post("/register", addNewUser)
}

module.exports = userRoute;