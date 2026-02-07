const { redisClient } = require("../config/redis.config");

const addSubscription = async (userId, instrument) => {
  await redisClient.sAdd(`subs:${userId}`, instrument.toUpperCase());
};

const removeSubscription = async (userId, instrument) => {
  await redisClient.sRem(`subs:${userId}`, instrument.toUpperCase());
};

const getSubscriptions = async (userId) => {
  return await redisClient.sMembers(`subs:${userId}`);
};

module.exports = {
  addSubscription,
  removeSubscription,
  getSubscriptions
};
