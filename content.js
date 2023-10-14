chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'fetchTodoistData') {
        fetch('https://api.todoist.com/rest/v1/tasks', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${message.token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            sendResponse(data);
        })
        .catch(error => {
            console.error("Error fetching Todoist data:", error);
            sendResponse({ error: error.message });
        });
        
        return true;  // Indicates we want to send a response asynchronously.
    }
});
