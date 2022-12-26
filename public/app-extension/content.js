// Call from mainfest.json, when document load
window.addEventListener('DOMContentLoaded', () => {
    const form = getLoginForm();
    if (form === undefined)
        return;

    form.addEventListener("submit", async () => {
        let username = '', password = '';
        const inputElements = form.querySelectorAll('input');
        for (let i = 0; i < inputElements.length; i++){
            const type = inputElements[i].getAttribute('type');

            if (type != 'hidden' && type != 'password') {
                username = inputElements[i].value;
                console.log(username);
                continue;
            }
            if (type === 'password') {
                password = inputElements[i].value;
                console.log(password);
                continue;
            }
        }
        
        const data = {type: 'show-popup', username: username, password: password, url: window.location.hostname};
        await chrome.runtime.sendMessage(data);
    });
})

// Return form or undefined
function getLoginForm(){
    if (document.forms.length > 0) {
        for (let i = 0; i < document.forms.length; i++){
            if (document.forms[i].querySelectorAll('input[type="password"]').length > 0)
                return document.forms[i];
        }
    }

    return undefined;
}