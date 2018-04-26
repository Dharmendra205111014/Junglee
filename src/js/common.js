export const bindEvent = (id, event, callback) => {
    document.getElementById(id).addEventListener(event, function(e) {
        e.stopPropagation()
        callback.call();
    });
}