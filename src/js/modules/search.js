import { bindEvent } from '../common.js'

const template = data => `
    <div class="search-container">
        <h1>${data.heading}</h1>
        <div class="arrow"></div>
        <button id="main-button" class="button-success">${data.buttonText}</button>
    </div>
    <div id="model" class="model">
        <div id="model-mask" class="model-mask">
            <div class="model-body">
                <button id="close-model" class="close-model">X</button>
                <div class="model-content">
                    <div class="model-header">Enter Search Criteria</div>
                    <div class="form">
                        <div class="form-input-group">
                            <div class="left width-25"><label for="artist-name">Artist name</label></div>
                            <div class="right width-75"><input id="artist-name" type="text" value=""></div>
                        </div>
                        <div class="form-input-group">
                            <div class="left width-25"><label for="track-count">No. of tracks</label></div>
                            <div class="right width-75"><input id="track-count" type="number" value="" min="1" max="10"></div>
                        </div>
                        <div class="form-input-group">
                            <div id="message" class="error"></div>
                            <div class="right width-75">
                                <button id="serach-button" class="button-success">Search</button>
                            </div>
                        </div>
                    </div>
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
    //bindEvent('model-mask', 'click', _closeModel);
    bindEvent('close-model', 'click', _closeModel);
    bindEvent('serach-button', 'click', _validateSearch);
}

const _openModel = () => {
    var model = document.getElementById("model");
    model.style.display="block";
}

const _closeModel = () => {
    var model = document.getElementById("model");
    model.style.display="none";
}

const _validateSearch = () => {
    var artistNameDom = document.getElementById("artist-name");
    var trackCountDom = document.getElementById("track-count");
    var messageDom = document.getElementById("message");
    messageDom.innerHTML=""
    console.log(artistNameDom, trackCountDom, messageDom);
    if (artistNameDom.value === "Dharmendra" && trackCountDom.value === parseInt(4)) {
        _searchStart();
    } else {
        messageDom.innerHTML = "Wrong input";
    }
}

const _searchStart = () => {

}

export default {
    render : _render
}