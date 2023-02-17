const windows = [];
var clickcycles = 0, windowcounts = 0, windowindexes = 0, taskbar = false, activewindow = '', svcache = {};

function getScreen() {
    return {
        "width": window.innerWidth,
        "height": window.innerHeight
    };
}
function getElementSizes(elementid) {
    let element = document.getElementById(elementid);
    let sizes = element.getBoundingClientRect();
    return sizes;
}
function getParents(el, parentSelector) {
    if (parentSelector === undefined) {
        parentSelector = document;
    }
    var parents = [];
    var p = el.parentNode;
    while (p !== parentSelector) {
        var o = p;
        parents.push(o);
        p = o.parentNode;
    }
    parents.push(parentSelector);
    return parents;
}
function zero_first_format(value) {
    if (value < 10) { value='0' + value; }
    return String(value);
}
function getDate(perform = 'sidebar') {
    var current_datetime = new Date();
    var hours = zero_first_format(current_datetime.getHours());
    var minutes = zero_first_format(current_datetime.getMinutes());
    var seconds = zero_first_format(current_datetime.getSeconds());
    if (perform == 'sidebar') {
        return {hours: hours, minutes: minutes, seconds: seconds};
    }
    else {
        var day = zero_first_format(current_datetime.getDate());
        var month = zero_first_format(current_datetime.getMonth()+1);
        var year = current_datetime.getFullYear();
        return {year: year, month: month, day: day, hours: hours, minutes: minutes, seconds: seconds};
    }
}
createInterval = function(cb, timeout, data) {
    if (typeof cb !== "function") {
        throw new Error("Please provide a callback.");
    }
    var interval = window.setInterval(function(data) {
        cb(data, interval);
    }, timeout || 0, data);
    return interval;
};