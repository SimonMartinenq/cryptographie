//ajouter a "tableKey un nombre "num" de ligne passé en parametres
function redefTable(tableKey, num) {

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