export const bindEvent = (id, event, callback) => {
    document.getElementById(id).addEventListener(event, function() {
        callback.call();
    })
}