import { bindEvent } from '../common.js'

const template = data => `
    <div>
        <h1>${data.heading}</h1>
        <button id="main-button">${data.buttonText}</button>
    </div>
    <div id="model" class="model">
        <div id="model-mask" class="model-mask">
            <div class="model-body">
                <div class="model-content">
                    This is model content
                    <button id="close-model">close</button>
                </div>
            </div>
        </div>
    </div>
`

const data = {
    heading: 'Find your artist below',
    buttonText: 'Search Artist'
}

const _render = (parentId) => {
    var parent = document.getElementById(parentId);
    if (parent) {
        parent.innerHTML = template(data);
    }
    _bindEvents();
}

const _bindEvents = () => {
    // Event binding on button click
    bindEvent('main-button', 'click', _openModel);
    bindEvent('model-mask', 'click', _closeModel);
    bindEvent('close-model', 'click', _closeModel);
}

const _openModel = () => {
    var model = document.getElementById("model");
    model.style.display="block";
}

const _closeModel = () => {
    var model = document.getElementById("model");
    model.style.display="none";
}

export default {
    render : _render
}