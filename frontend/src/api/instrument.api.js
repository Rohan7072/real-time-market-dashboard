export const subscribeInstrument = async (payload, token) => {
  const res = await fetch(
    "http://localhost:8082/api/instruments/subscribe",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` // 🔥 REQUIRED
      },
      body: JSON.stringify(payload)
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Subscribe failed");
  }

  return await res.json();
};

export const unsubscribeInstrument = async (payload, token) => {
  const res = await fetch(
    "http://localhost:8082/api/instruments/unsubscribe",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Unsubscribe failed");
  }

  return await res.json();
};
