const express = require("express");

const router = express.Router();

const { shortenUrl, redirectToUrl } = require("../controllers/url");

router.route("/").post(shortenUrl);
router.get("/:id", redirectToUrl);

module.exports = router;