dict = {}


function addCard(dict) {
    dict[document.getElementById("front").value] = document.getElementById("back").value;
    document.getElementById("entry").reset();
    return dict;
}

function begin(dict) {
    var keys = Object.keys(dict);
    result = keys[Math.floor(keys.length * Math.random())]
    document.getElementById("card").innerHTML = result;
    return result
}

function initDict() {
    var dict = {};
    return dict;
}

function flip(dict, result) {
    document.getElementById("card").innerHTML = dict[result];
}