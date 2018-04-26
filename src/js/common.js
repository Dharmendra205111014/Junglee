/**
 * Function to bind event to DOM node
 * @param {String} id document ID for which event is binding
 * @param {String} event event name
 * @param {Function} callback callback functon when event emitted
 */
export const bindEvent = (id, event, callback) => {
    document.getElementById(id).addEventListener(event, function(e) {
        e.stopPropagation()
        callback.call();
    });
}