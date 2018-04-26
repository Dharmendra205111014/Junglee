import { bindEvent } from '../common.js'
import searchService from '../searchService.js'
import result from './result.js'

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

const INPUT_TERM_VALUE_VALIDATE = "jack";
const INPUT_LIMIT_VALUE_VALIDATE = 4;

var data = {
    heading: 'Find your artist below',
    buttonText: 'Search Artist'
}

/**
 * Function to render module template in DOM conatiner
 * @param {String} containerId - DOM ID of parent container
 */
const _render = (containerId) => {
    var container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = template(data);
    }
    _bindEvents();
}

/**
 * Bind all DOM event related to this module
 */
const _bindEvents = () => {
    // Event binding on button click
    bindEvent('main-button', 'click', _openModel);
    bindEvent('close-model', 'click', _closeModel);
    bindEvent('serach-button', 'click', _validateSearch);
}

/**
 * To open search pop up
 */
const _openModel = () => {
    var model = document.getElementById("model");
    model.style.display="block";
}

/**
 * To close search pop up
 */
const _closeModel = () => {
    var model = document.getElementById("model");
    model.style.display="none";
}

/**
 * To validate search data.
 * Currenty fixed data supported for validation success
 */
const _validateSearch = () => {
    var artistNameDom = document.getElementById("artist-name");
    var trackCountDom = document.getElementById("track-count");
    var messageDom = document.getElementById("message");
    messageDom.innerHTML=""
    if (artistNameDom.value && parseInt(trackCountDom.value) !== NaN && _isRestrictedInput(artistNameDom, trackCountDom)) {
        _searchStart({
            term: artistNameDom.value, 
            limit: parseInt(trackCountDom.value)
        });
    } else {
        messageDom.innerHTML = "Please make sure artist name is "+ INPUT_TERM_VALUE_VALIDATE +" and count is "+ INPUT_LIMIT_VALUE_VALIDATE;
    }
}

const _isRestrictedInput = (artistNameDom, trackCountDom) => {
    return artistNameDom.value === INPUT_TERM_VALUE_VALIDATE && parseInt(trackCountDom.value) === INPUT_LIMIT_VALUE_VALIDATE;
}

/**
 * To invoke search service and load reasults on response
 * @param {object} serachObj 
 */
const _searchStart = (serachObj) => {
    result.updateRequest(serachObj);
    searchService.search(serachObj).then(response => {
        result.update(response);
        result.render("app");
        // We could also use
        // result.render("app", response);
    }).catch(error => {
        console.log("response error", error);
    })
}

export default {
    render : _render
}