import { bindEvent } from '../common.js'
import search from './search.js'

const template = data => `<div class="results-container">
    <div class="result-header">
        <h1>
            Search results for "${data.term}"
            <span id="clear-span" class="clear-span">( Clear )</span>
        </h1>
    </div>
    ${data.results.map(result =>
    `    <div class="result-container">
            <div class="result__image-container left"><img src="${result.artworkUrl100}"></div>
            <div class="result__data-container">
                <div class="result__data-artist-name">Artist name : ${result.artistName}</div>
                <div class="result__data-track-name">Track name : ${result.trackName}</div>
                <div class="result__data-desc">${result.longDescription || ''}</div>
            </div>
            <div class="clearfix"></div>
        </div>`
    ).join('')}
</div>`;

/**
 * Function to render module template in DOM conatiner
 * @param {String} containerId - DOM ID of parent container
 * @param {*} result - result to update in data before render the module template
 */
const _render = (containerId, result) => {
    console.log("data", data);
    if (result) {
        _updateResults(result);
    }
    var container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = template(data);
    }
    _bindEvents();
}

/**
 * To close result page and navigate back to serach
 */
const _closeResults = () => {
    search.render("app");
    console.log("close results");
}

/**
 * To bind DOM events
 */
const _bindEvents = () => {
    // Event binding on button click
    bindEvent('clear-span', 'click', _closeResults);
}

/**
 * To update search result in data
 * @param {Array} results
 */
const _updateResults = (results) => {
    data.results = results;
}

/**
 * To update serach query in data
 * @param {object} request
 */
const _updateRequest = (request) => {
    data.term = request.term;
    data.limit = request.limit;
}

var data = {}

export default {
    render: _render,
    update: _updateResults,
    updateRequest: _updateRequest
}