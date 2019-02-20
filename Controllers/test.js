const express = require('express');
const router = express.Router();

router.get("/", async (req,res) => {
 res.send("Looks like the routing is configured");
});

module.exports = router;
