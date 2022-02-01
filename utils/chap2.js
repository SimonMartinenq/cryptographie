//pensez à quel indice commence l'alphabet ex : a=0 ou a=1
function translateMotToNum(mots, alphabet) {
    let num = []
    for (let i = 0; i < mots.length; i++) {
        for (let j = 0; j < alphabet.length; j++) {
            if (mots[i] == alphabet[j]) {
                num.push(j)
            }

        }

    }
    return num
}


//pensez a mettre un tableau d'entier pour le nombre 
//Dans ce cas a=1
function translateNumToMot(num, alphabet) {
    let mot = ""
    for (let i = 0; i < num.length; i++) {
        for (let j = 1; j <= alphabet.length; j++) { //pour a=1 -> j=1
            if (j == num[i]) {
                mot += alphabet[j - 1] //pour a=1 indice j-1
            }

        }

    }
    return mot
}

/* Cesar cipher */

cipherCesar.onclick = () => {
    const alphabet = alphabetCesar.value
    const key = keyCesar.value
    const message = messageCesar.value
    const numMessage = translateMotToNum(message, alphabet)
    let cipherMessage = []
    numMessage.forEach(element => {
        cipherMessage.push(parseInt(element) + parseInt(key))
    });
    alert("The cipher message is: " + translateNumToMot(cipherMessage, alphabet))
}

decipherCesar.onclick = () => {
    const alphabet = alphabetCesar.value
    const key = keyCesar.value
    const message = messageCesar.value
    const numMessage = translateMotToNum(message, alphabet)
    let cipherMessage = []
    numMessage.forEach(element => {
        cipherMessage.push(parseInt(element) + parseInt(key))
    });
    alert("The cipher message is: " + translateNumToMot(cipherMessage, alphabet))
}





buttonOkSizeVig.onclick = () => {
    const hauteur = hauteurTableVig.value
    if (hauteur == "" || hauteur < 1 || hauteur > 11) {
        alert("wrong values")
    } else {
        let tableKey = document.getElementById("tableVig")
            //supprimer la table precedente
        while (tableKey.rows.length > 0) {
            tableKey.deleteRow(0)
        }
        for (let index = 0; index < hauteur; index++) {
            let newLine = document.createElement("tr")
            let newRow = document.createElement("td")
            let newInput = document.createElement("input")
            newRow.id = "keyVig" + index
            newRow.appendChild(newInput)
            newLine.appendChild(newRow)
            tableKey.appendChild(newLine)
        }
    }
}

buttonOkSizeVigG.onclick = () => {
    const dimensions = dimensionsTableVigG.value
    if (dimensions == "" || dimensions < 1 || dimensions > 3) { // max matrice 3x3
        alert("wrong values")
    } else {

        //table de la clef A
        let tableKey = document.getElementById("tableVigGA")

        //supprimer la table precedente
        while (tableKey.rows.length > 0) {
            tableKey.deleteRow(0)
        }

        //creation de la nouvelle table
        for (let index = 0; index < dimensions; index++) {
            let newLine = document.createElement("tr")
            for (let index2 = 0; index2 < dimensions; index2++) {
                let newRow = document.createElement("td")
                let newInput = document.createElement("input")
                newRow.id = "keyVigG" + index2
                newRow.appendChild(newInput)
                newLine.appendChild(newRow)
            }
            tableKey.appendChild(newLine)
        }

        let tableKeyB = document.getElementById("tableVigGB")
            //table cleb B
        while (tableKeyB.rows.length > 0) {
            tableKeyB.deleteRow(0)
        }
        //creation de la nouvelle table
        for (let index2 = 0; index2 < dimensions; index2++) {
            let newLine = document.createElement("tr")
            let newRow = document.createElement("td")
            let newInput = document.createElement("input")
            newRow.id = "keyVigG" + index2
            newRow.appendChild(newInput)
            newLine.appendChild(newRow)
            tableKeyB.appendChild(newLine)
        }
    }

}