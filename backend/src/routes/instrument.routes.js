const express = require("express");
const router = express.Router();

const {
  subscribe,
  unsubscribe
} = require("../controllers/instrument.controller");

const { authenticate } = require("../middlewares/auth.middleware");
const { validateSubscribe } = require("../middlewares/validate.middleware");

router.post("/subscribe", authenticate, validateSubscribe, subscribe);
router.post("/unsubscribe", authenticate, validateSubscribe, unsubscribe);

module.exports = router;
