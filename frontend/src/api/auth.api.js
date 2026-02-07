export const loginApi = async (payload) => {
  console.log("📤 Calling login API with:", payload);

  const res = await fetch("http://localhost:8082/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return await res.json();
};
