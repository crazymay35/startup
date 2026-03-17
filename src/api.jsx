import {useState, useEffect} from "react";

export async function apiRequest(url, method = "GET", body = null) {
    const options = {
        method,
        headers: {"Content-Type": "application/json"},
    };
    if (body !== null) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    
    const data = await response.json().catch(() => null);
    if (!response.ok) {
        const message = data?.msg || `API error (${response.status})`;
        throw new Error(message);
    }
    return data;
}

export function useUser() {
  const [email, setEmail] = useState(() => localStorage.getItem("currentUser"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!email) return;

    apiRequest(`/api/user/${email}`)
      .then(setUser)
      .catch(() => setUser(null));
  }, [email]);

  return { email, setEmail, user };
}