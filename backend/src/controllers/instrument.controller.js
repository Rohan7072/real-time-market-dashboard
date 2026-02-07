const repo = require("../repositories/subscription.repository");

const subscribe = async (req, res, next) => {
  try {
    const { instrumentName } = req.body;
    const { userId } = req.user;

    await repo.addSubscription(userId, instrumentName);

    res.json({
      error: false,
      message: "Instrument Subscribed",
      data: { instrumentName }
    });
  } catch (err) {
    next(err);
  }
};

const unsubscribe = async (req, res, next) => {
  try {
    const { instrumentName } = req.body;
    const { userId } = req.user;

    await repo.removeSubscription(userId, instrumentName);

    res.json({
      error: false,
      message: "Instrument Unsubscribed",
      data: { instrumentName }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  subscribe,
  unsubscribe
};
