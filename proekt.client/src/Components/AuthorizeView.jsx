import React, { useState, useEffect, createContext } from 'react';

const UserContext = createContext({});

function AuthorizeView({ children, unauthorizedContent }) {
    const [authorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    const emptyUser = { email: "" };
    const [user, setUser] = useState(emptyUser);

    useEffect(() => {
        let retryCount = 0
        let maxRetries = 10
        let delay = 1000

        function wait(delay) {
            return new Promise((resolve) => setTimeout(resolve, delay));
        }


        async function fetchWithRetry(url, options) {
            try {

                let response = await fetch(url, options)

                if (response.status === 200) {
                    console.log("Authorized")
                    let data = await response.json()
                    setUser({ email: data.email })
                    setAuthorized(true)
                    return response
                } else if (response.status === 401) {
                    console.log("Unauthorized")
                    return response
                } else {

                    throw new Error("" + response.status)
                }
            } catch (error) {

                retryCount++;

                if (retryCount > maxRetries) {

                    throw error;
                } else {

                    await wait(delay);
                    return fetchWithRetry(url, options)
                }
            }
        }


        fetchWithRetry("/pingauth", {
            method: "GET",
        })
            .catch((error) => {
                // Handle the final error
                console.log(error.message);
            })
            .finally(() => {
                setLoading(false)
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>
    }

    if (authorized) {
        return (
            <UserContext.Provider value={user}>
                {children} {/* Render children only if authorized */}
            </UserContext.Provider>
        );
    } else {
        return <>{unauthorizedContent}</>; 
    }
}

export function AuthorizedUser({ value }) {
    
    const user = React.useContext(UserContext);

    
    if (value === "email") return <>{user.email}</>;
    else return null;
}

export default AuthorizeView;
