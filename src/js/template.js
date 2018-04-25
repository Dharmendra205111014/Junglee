_render = (document, template, data) => {
    document = (typeof a !== "object") ? document.getElementById(document) : document;
    if (document) {
        document.innerHTML = template.call(null, data);
    }
}

export default {
    render : _render,
    parse: _parse
}