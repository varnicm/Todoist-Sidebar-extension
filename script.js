// Step 1: Authorization Request
const CLIENT_ID = '';
const REDIRECT_URI = ''; // Replace with your redirect URI
const SCOPES = 'data:read'; // Replace with the scopes you want

const authorizationUrl = `https://todoist.com/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPES}&state=secretstring`;

// This will open the authorization URL in a new browser tab/window
window.open(authorizationUrl, '_blank');

// In a real-world application, you'd have a more automated way to capture the code from the redirect.
// For this example, we'll assume the user copies and pastes the code into a prompt dialog.
const code = prompt("Enter the code from the redirect URL:");

// Step 3: Token Exchange
const TOKEN_URL = "https://todoist.com/oauth/access_token";
const CLIENT_SECRET = '';

const payload = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: code,
    redirect_uri: REDIRECT_URI
};

fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
})
.then(response => response.json())
.then(data => {
    if(data.access_token) {
        console.log("Access Token:", data.access_token);
    } else {
        console.log("Error:", data.error || "Unknown Error");
    }
})
.catch(error => console.error("There was an error fetching the token:", error));
