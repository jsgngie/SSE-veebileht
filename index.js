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
      //  document.getElementById("card").innerHTML = result;
        document.getElementById('alustaNupp').style.visibility = 'hidden';
        document.getElementById('sisestaNupp').style.visibility = 'hidden';
        document.getElementById('keeraNupp').removeAttribute("hidden");
        flip(dict, "");
    }
}

function flip(dict, result) {
    var flashcard = {
        front: 'Front of flashcard',
        back: 'Back of flashcard'
      };
    document.getElementById("card").innerHTML = "";

    var flashcardContainer = document.getElementById('flashcard-container');
    var flashcardElement = flashcardContainer.querySelector('.flashcard');
    var flashcardFrontElement = flashcardElement.querySelector('.flashcard-front');
    var flashcardBackElement = flashcardElement.querySelector('.flashcard-back');  

    if (displayedVars.length == 0) {
        result = getRandomKey(dict);
        document.getElementById("keeraNupp").innerText = "Keera";
        flashcardFrontElement.textContent = result;
        displayedVars.push(dict[result])
    } else if (document.getElementById("keeraNupp").innerText == "Keera") {
        flashcardBackElement.textContent = dict[result];
        displayedVars.push(dict[result])
        flashcardElement.classList.toggle('flipped');
        document.getElementById("keeraNupp").innerText = "Järgmine";
    } else if (document.getElementById("keeraNupp").innerText == "Järgmine") {
        if (Object.keys(dict).length == displayedVars.length) {
            document.getElementById("card").innerHTML = "Kaardid on otsas!";
            document.getElementById("keeraNupp").innerText = "Alusta Uuesti";
        } else {
            result = getRandomKey(dict);
            document.getElementById("keeraNupp").innerText = "Keera";
            flashcardFrontElement.textContent = result;
            flashcardElement.classList.toggle('flipped');
        }
    } else if (document.getElementById("keeraNupp").innerText == "Alusta Uuesti") {
        displayedVars = []
        result = getRandomKey(dict);
        flashcardFrontElement.textContent = result;
        document.getElementById("keeraNupp").innerText = "Keera";
        flashcardElement.classList.toggle('flipped');
    } 
}

function getRandomKey(dict) {
    keys = Object.keys(dict);
    availableKeys = keys.filter(n => !displayedVars.includes(n))
    result = availableKeys[Math.floor(availableKeys.length * Math.random())]
    return result
}

function laeLinnad() {
    var input = document.getElementById('fileInput');
    console.log(input);
    var reader = new FileReader();
    reader.onload = function() {
      var text = reader.result;
      var lines = text.split('\r\n');
      for (var i = 0; i < lines.length; i++) {
        line = lines[i].split(',');
        dict[line[0]] = line[1];
    }
    };
    reader.readAsText(input.files[0]);
}
