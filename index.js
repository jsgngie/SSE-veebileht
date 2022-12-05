dict = {}
displayedVars = [];

// Logic to add cards from inputs to the dictionary.
function addCard() {
    if (document.getElementById("front").value == "" || document.getElementById("back").value == "") {
        return None
    }
    dict[document.getElementById("front").value] = document.getElementById("back").value;
    document.getElementById("entry").reset();
}

// Start Flipping Cards
function begin() {
    if (Object.keys(dict).length === 0) {
        document.getElementById("card").innerHTML = "Kaarte Pole Lisatud!";
    } else {
        flip();
    }
}

// Flipping logic
function flip() {
    var flashcard = {
        front: 'Eesmine Külg',
        back: 'Tagumine Külg'
      };
    document.getElementById("card").innerHTML = "";

    var flashcardContainer = document.getElementById('flashcard-container');
    var flashcardElement = flashcardContainer.querySelector('.flashcard');
    var flashcardFrontElement = flashcardElement.querySelector('.flashcard-front');
    var flashcardBackElement = flashcardElement.querySelector('.flashcard-back');  

    if (displayedVars.length == 0) {
        result = getRandomKey(dict);
        displayedVars.push(result)
        document.getElementById("keeraNupp").innerText = "Keera";
        flashcardFrontElement.textContent = result;
    } else if (document.getElementById("keeraNupp").innerText == "Keera") {
        flashcardBackElement.textContent = dict[result];
        flashcardElement.classList.toggle('flipped');
        document.getElementById("keeraNupp").innerText = "Järgmine";
    } else if (document.getElementById("keeraNupp").innerText == "Järgmine") {
        if (Object.keys(dict).length == displayedVars.length) {
            document.getElementById("card").innerHTML = "Kaardid on otsas!";
            document.getElementById("keeraNupp").innerText = "Alusta Uuesti";
        } else {
            result = getRandomKey(dict);
            displayedVars.push(result)
            document.getElementById("keeraNupp").innerText = "Keera";
            flashcardFrontElement.textContent = result;
            flashcardElement.classList.toggle('flipped');
        }
    } else if (document.getElementById("keeraNupp").innerText == "Alusta Uuesti") {
        displayedVars = []
        result = getRandomKey(dict);
        displayedVars.push(result)
        flashcardFrontElement.textContent = result;
        document.getElementById("keeraNupp").innerText = "Keera";
        flashcardElement.classList.toggle('flipped');
    } 
}

// Pulls random key from the dictionary
function getRandomKey(dict) {
    keys = Object.keys(dict);
    availableKeys = keys.filter(n => !displayedVars.includes(n))
    result = availableKeys[Math.floor(availableKeys.length * Math.random())]
    return result
}

// Loads in user inputted csv file.
function laeFail() {
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
