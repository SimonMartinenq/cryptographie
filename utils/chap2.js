buttonOkSizeVig.onclick = () => {
    const largeur = largeurTableVig.value
    const hauteur = hauteurTableVig.value
    if (largeur == "" || hauteur == "" || largeur < 1 || hauteur < 1) {
        alert("wrong values")
    } else {
        let tableKey = document.getElementById("tableVig")
            //supprimer la table precedente
        for (let index = 0; index < tableKey.rows.length; index++) {
            tableKey.deleteRow(index)
        }

        for (let index = 0; index < hauteur; index++) {
            let newLine = document.createElement("tr")
            for (let index2 = 0; index2 < largeur; index2++) {
                let newRow = document.createElement("td")
                newRow = document.createElement("input")
                newLine.appendChild(newRow)
            }
            tableKey.appendChild(newLine)
        }
    }
}