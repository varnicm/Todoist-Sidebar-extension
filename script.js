function fetchTodoistProjects(token) {
    return fetch("https://api.todoist.com/rest/v2/projects", {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(projects => {
        console.log(projects);
        return projects; // This contains the list of projects
    })
    .catch(error => {
        console.error('Failed to fetch projects:', error);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById('loginBtn');
    var token = localStorage.getItem('todoistToken');

    if (token) {
        document.getElementById('status').innerText = 'Logged in';
        document.getElementById('loginBtn').style.display = 'none';
        fetchUserTasks(token);
    }

    if (button) {
        button.addEventListener('click', function() {

            console.log("Button clicked!");

            const clientId = '58267cc5cbd542478775454401832e86';
            const redirectUri = 'https://moesanjari.com/redirect.php';
            const scope = 'data:read';
            const state = Math.random().toString(36).substring(7);

            const authUrl = `https://todoist.com/oauth/authorize?client_id=${clientId}&scope=${scope}&state=${state}`;

            console.log("Redirecting to:", authUrl);
            
            // Use chrome.tabs API to create a new tab with the auth URL
            //chrome.tabs.create({ url: authUrl });
            window.open(authUrl, '_blank');

        });
    } else {
        console.error("Button element not found!");
    }
});

// window.addEventListener("message", function(event) {
//     if (event.data.messageType && event.data.messageType === 'authorizationToken') {
//         var token = event.data.token;
//         console.log("Received token:", token);

//         // Save the token for future use
//         localStorage.setItem('todoistToken', token);

//         // Update the UI
//         document.getElementById('status').innerText = 'Logged in';
//         document.getElementById('loginBtn').style.display = 'none';

//         // Optionally, fetch tasks or other data here using the token.
//     }
// });

window.addEventListener("message", function(event) {
    if (event.data.messageType && event.data.messageType === 'authorizationToken') {
        var token = event.data.token;
        console.log("Received token:", token);

        // Save the token for future use
        localStorage.setItem('todoistToken', token);

        // Update the UI
        document.getElementById('status').innerText = 'Logged in';
        document.getElementById('loginBtn').style.display = 'none';

        // Fetch Todoist projects
        fetchTodoistProjects(token)
            .then(projects => {
                if (projects) {
                    // TODO: Call a function to handle and display these projects
                    displayProjects(projects);
                }
            });
    }
});

function displayProjects(projects) {
    const projectsList = document.getElementById('tasksList');
    projectsList.innerHTML = ''; // Clear any existing content

    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.innerText = project.name; // Assuming 'name' is a property of your project
        projectsList.appendChild(projectElement);
    });
}

function fetchTasks(token) {
    // Here, call the Todoist API to fetch tasks or other information using the token.
    // Once fetched, update the `tasks` div in the UI.
}

function fetchUserTasks(token) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ action: "fetchTasks", token: token }, response => {
            if (response.success) {
                const tasks = response.data;
                console.log(tasks);
                resolve(tasks);
            } else {
                console.error('There was a problem with the fetch operation:', response.error);
                reject(response.error);
            }
        });
    });
}



// Usage
const accessToken = localStorage.getItem('todoistToken');  // Replace with your token
