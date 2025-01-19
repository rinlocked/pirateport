let auth0 = null;

async function initAuth0() {
    auth0 = await createAuth0Client({
        domain: "dev-18mooqg1v2x7qj4k.us.auth0.com",
        client_id: "9YL8rKoGTsTjk1F14k7QlLjHJpKTykYf"
    });

    const query = window.location.search;
    if (query.includes("code=") && query.includes("state=")) {
        await auth0.handleRedirectCallback();
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    const isAuthenticated = await auth0.isAuthenticated();

    if (isAuthenticated) {
        if (window.location.pathname.endsWith("dashboard.html")) {
            const user = await auth0.getUser();
            document.getElementById("welcome").innerText = `Ahoy, ${user.name || "Mysterious Pirate"}!`;
            document.getElementById("role").innerText = "Pirate";  

            document.getElementById("logout").addEventListener("click", async () => {
                await auth0.logout({
                    returnTo: window.location.origin + "/index.html" // Adjusts to live or local environment
                });
            });
        }
    } else {
        if (window.location.pathname.endsWith("index.html")) {
            document.getElementById("login").addEventListener("click", async () => {
                await auth0.loginWithRedirect({
                    redirect_uri: `${window.location.origin}/dashboard.html` // Dynamically handles live or local environment
                });
            });
        }
    }
}

window.onload = initAuth0;

let starterNameArray = ['Captain', 'Criminal', 'Robber', 'Executioner', 'Sailor', 'Blacksmith', 'Conqueror', 'Commander'];
let endingNameArray = ['The Great', 'The Amazing', 'The Forgetful', 'The Lost', 'The Best', 'Supreme'];
