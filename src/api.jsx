import {useState, useEffect} from "react";

export async function apiRequest(url, method = "GET", body = null) {
    const options = {
        method,
        headers: {"Content-Type": "application/json"},
    };
    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.msg || "API error");
    }
    return data;
}

export function useUser() {
    const email = localStorage.getItem("currentUser");
    const [user,setUser] = useState(null);

    useEffect(() => {
        if (!email) return;

        apiRequest(`/api/user/${email}`).then(setUser);
    }, [email]);
    return {email,user,setUser}
}