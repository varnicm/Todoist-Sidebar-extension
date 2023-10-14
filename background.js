chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'fetchTodoistData') {
        const token = request.token;
        const headers = new Headers({
            "Authorization": `Bearer ${token}`
        });

        fetch('https://api.todoist.com/rest/v1/tasks', { headers: headers })
            .then(response => response.json())
            .then(data => {
                sendResponse({ data: data });
            })
            .catch(error => {
                sendResponse({ error: error.toString() });
            });

        // This will keep the message channel open until `sendResponse` is called
        return true;
    }
});
