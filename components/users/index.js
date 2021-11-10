const { Router } = require("express");
const router = new Router();

module.exports = ( app ) => {
    app.use("/users", router);
    router.get("/", (req, res) => {
        res.send("Todo ok desde users");
    })
}