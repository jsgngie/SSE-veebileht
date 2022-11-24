dict = {}
displayedVars = [];

function addCard(dict) {
    if (document.getElementById("front").value == "" || document.getElementById("back").value == "") {
        return None
        //idee poolest peaks ta nüüd tühjasid välju mitte lisama. Pole kindel kas töötab Js täiesti müstika minu jaoks
    }
    dict[document.getElementById("front").value] = document.getElementById("back").value;
    document.getElementById("entry").reset();
    return dict;
}

function begin(dict) {
    if (Object.keys(dict).length === 0) {
        document.getElementById("card").innerHTML = "Kaarte Pole Lisatud!";
    } else {
        result = getRandomKey(dict);
        document.getElementById("card").innerHTML = result;
        document.getElementById('alustaNupp').style.visibility = 'hidden';
        document.getElementById('sisestaNupp').style.visibility = 'hidden';
        document.getElementById('keeraNupp').removeAttribute("hidden");

        return result
    }
}

function flip(dict, result) {
    if (document.getElementById("keeraNupp").innerText == "Keera") {
        document.getElementById("card").innerHTML = dict[result];
        displayedVars.push(dict[result])
        document.getElementById("keeraNupp").innerText = "Järgmine";
    } else if (document.getElementById("keeraNupp").innerText == "Järgmine") {
        if (Object.keys(dict).length == displayedVars.length) {
            document.getElementById("card").innerHTML = "Kaardid on otsas!";
            document.getElementById("keeraNupp").innerText = "Alusta Uuesti";
        } else {
            result = getRandomKey(dict);
            document.getElementById("card").innerHTML = result;
            document.getElementById("keeraNupp").innerText = "Keera";
        }
    } else if (document.getElementById("keeraNupp").innerText == "Alusta Uuesti") {
        displayedVars = []
        result = getRandomKey(dict);
        document.getElementById("card").innerHTML = result;
        document.getElementById("keeraNupp").innerText = "Keera";
    }
}

function getRandomKey(dict) {
    keys = Object.keys(dict);
    availableKeys = keys.filter(n => !displayedVars.includes(n))
    result = availableKeys[Math.floor(availableKeys.length * Math.random())]
    return result
}