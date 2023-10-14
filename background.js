chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fetchTasks") {
        fetchTodoistTasks(request.token).then(tasks => {
            sendResponse({ success: true, data: tasks });
        }).catch(error => {
            sendResponse({ success: false, error: error.toString() });
        });

        // This is important: Return true to indicate that you wish to send a response asynchronously
        return true;
    }
});

function fetchTodoistTasks(token) {
    return new Promise((resolve, reject) => {
        const endpoint = 'https://api.todoist.com/rest/v2/projects';
        fetch(endpoint, {
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
        .then(data => {
            console.log(data)
            resolve(data);
        })
        .catch(error => {
            reject(error);
        });
    });
}
