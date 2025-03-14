const express = require('express');
const userRoute = require('../../modules/user/routes/user.routes');
const groupRoutes = require('../../modules/group/routes/group.routes');
const messageRoute = require('../../modules/messages/routes/message.routes');

const apiRoutes = (io) => {
    const app = express.Router();

    userRoute(app);
    groupRoutes(app);
    messageRoute(app,io);
    
    return app;
}

module.exports = apiRoutes;