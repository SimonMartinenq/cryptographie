// penser un fichier js avec juste les fonctions pour tous les chapitres

//modulo
Number.prototype.mod = function(n) { return ((this % n) + n) % n; }



function isPrime(n) {
    if (n == 2 || n == 3) return true
    if (n < 2 || n % 2 == 0) return false
    if (n < 9) return true
    if (n % 3 == 0) return false
    let f = 5
    if (n % f == 0) return false
    if (n % (f + 2) == 0) return false
    return true
}

function pgcd(a, b) {
    let rk = [a, b]

    let stop = false
    let i = 2
    while (!stop) {
        rk.push(rk[i - 2] % rk[i - 1])
        if (rk[i] == 0) stop = true
        i += 1
    }
    return rk[i - 2]
}

function primeFacor(n) {
    let decompose = []
    let d = 2
    let i = 0
    while (d <= n) {
        if (n % d == 0) {
            decompose[i] = d
            n = Math.floor(n / d)
            i += 1
        } else d = d + 1
    }
    return decompose
}

function calculateInverse(a, modulo) {
    let uk = []
    let vk = []
    let rk = []
    let qk = [0, 0]

    if (a == 1) {
        return 1
    } else if (pgcd(a, modulo) == 1) {
        uk[0] = 1
        uk[1] = 0
        vk[0] = 0
        vk[1] = 1
        rk[0] = modulo
        rk[1] = a

        stop = false
        let i = 2
        while (!stop) {
            rk[i] = rk[i - 2] % rk[i - 1]
            qk[i] = Math.floor(rk[i - 2] / rk[i - 1])
            uk[i] = uk[i - 2] - (qk[i] * uk[i - 1])
            vk[i] = vk[i - 2] - (qk[i] * vk[i - 1])
            if (rk[i] == 0) stop = true
            i += 1
        }
        return vk[i - 2].mod(modulo)
    } else return -666
}

isPrimeButton.onclick = function() {
        const n = nbrPremier.value
        if (isPrime(n)) {
            alert("le nombre EST premier")
        } else {
            alert("le nombre N'EST PAS premier")
        }
    }
    //cacher les explications
let togg1 = document.getElementById("buttonExpPrime");
let d1 = document.getElementById("divExpPrime");

togg1.onclick = () => {
    if (getComputedStyle(d1).display != "none") {
        d1.style.display = "none";
        togg1.textContent = "► show explanations";
    } else {
        d1.style.display = "block";
        togg1.textContent = "▼ hide explanations";
    }
}


//PGCD
//
pgcdButton.onclick = function() {
        const varPgcd = pgcd(aPgcd.value, bPgcd.value)
        if (varPgcd == 1) {
            alert("Le pgcd de " + aPgcd.value + " et " + bPgcd.value + " est: " + varPgcd + ", il sont premier entre eux")
        } else {
            alert("Le pgcd de " + aPgcd.value + " et " + bPgcd.value + " est: " + varPgcd)
        }
    }
    //cacher les explication
let togg2 = document.getElementById("buttonExpPgcd");
let d2 = document.getElementById("divExpPgcd");

togg2.onclick = () => {
    if (getComputedStyle(d2).display != "none") {
        d2.style.display = "none";
        togg2.textContent = "► show explanations";
    } else {
        d2.style.display = "block";
        togg2.textContent = "▼ hide explanations";
    }
}

//Factorisation en facteur premier
//
factorisationButton.onclick = function() {
        //en déduire le nombre de diviseurs
        alert("Les facteurs premiers sont: " + primeFacor(primeFactorisation.value))
    }
    //cacher les ecplications
let togg3 = document.getElementById("buttonPrimeFactor");
let d3 = document.getElementById("divPrimeFactor");

togg3.onclick = () => {
    if (getComputedStyle(d3).display != "none") {
        d3.style.display = "none";
        togg3.textContent = "► show explanations";
    } else {
        d3.style.display = "block";
        togg3.textContent = "▼ hide explanations";
    }
}

euclideEtenduButton.onclick = function() {
        let uk = []
        let vk = []
        let rk = []
        let qk = [0, 0]
        let aVar = aEuclide.value
        let bVar = bEuclide.value
        let tableEuclideEtendueVar = tableEuclideEtendue

        //supprimer les calculs precedent
        while (tableEuclideEtendueVar.rows.length > 4) {
            tableEuclideEtendueVar.deleteRow(4);
        }

        //vérifier que a > b
        if (aVar < bVar) {
            const tmp = aVar
            aVar = bVar
            bVar = tmp
        }

        if (aVar != "" && bVar != "") {
            uk[0] = (1)
            uk[1] = (0)
            vk[0] = (0)
            vk[1] = (1)
            rk[0] = (aVar)
            rk[1] = (bVar)

            stop = false
            let i = 2
            while (!stop) {
                let newLigne = document.createElement("tr")

                rk[i] = rk[i - 2] % rk[i - 1]
                qk[i] = Math.floor(rk[i - 2] / rk[i - 1])
                uk[i] = uk[i - 2] - qk[i] * uk[i - 1]
                vk[i] = vk[i - 2] - qk[i] * vk[i - 1]

                let row1 = document.createElement("td")
                row1.textContent = uk[i]
                newLigne.appendChild(row1)

                let row2 = document.createElement("td")
                row2.textContent = vk[i]
                newLigne.appendChild(row2)

                let row3 = document.createElement("td")
                row3.textContent = rk[i]
                newLigne.appendChild(row3)

                let row4 = document.createElement("td")
                row4.textContent = qk[i]
                newLigne.appendChild(row4)


                tableEuclideEtendueVar.appendChild(newLigne)
                if (rk[i] == 0) stop = true
                i += 1
            }
        } else alert("il manque des variables")

    }
    //cahcher les explication euclide etendue 
let togg4 = document.getElementById("buttonExtendEuclide");
let d4 = document.getElementById("divExtendEuclide");

togg4.onclick = () => {
    if (getComputedStyle(d4).display != "none") {
        d4.style.display = "none";
        togg4.textContent = "► show explanations";
    } else {
        d4.style.display = "block";
        togg4.textContent = "▼ hide explanations";
    }
}


//décompose un nombre en puissance de 2
function decPuiss2(chiffre) {
    let puissance = 0
    let valeurs = []
    while (chiffre > 0) {
        puissance += 1
        if (Math.pow(2, puissance) > chiffre) {
            let previous = Math.pow(2, puissance - 1)
            valeurs.push(previous)
            chiffre -= previous
            puissance = 0
        }
    }

    return valeurs.sort((a, b) => a - b)
}

powerButton.onclick = function() {

    let xPowerVar = xPower.value
    let pPowerVar = pPower.value
    let nPowerVar = nPower.value
    let tablePowerVar = tablePower
    if (xPowerVar == "" || pPowerVar == "" || nPowerVar == "") {
        alert("missing data")
    } else {
        //supprimer les calculs precedent
        while (tablePowerVar.rows.length > 2) {
            tablePowerVar.deleteRow(2);
        }

        //colonne 1 / decomposition en puissance de 2
        const decompoP = decPuiss2(pPowerVar)
        let col1 = []

        //col4
        let col4 = []

        for (let index = 1; index <= decompoP[decompoP.length - 1]; index = index * 2) {
            col1.push(index)
            if (!decompoP.includes(index)) {
                col4.push(false)
            } else {
                col4.push(true)
            }

        }
        //collonne 2 et 3 
        let col2 = [xPowerVar]
        let col3 = [xPowerVar % nPowerVar]

        for (let index = 1; index < col4.length; index++) {
            col2.push(Math.pow(col3[index - 1], 2))
            col3.push(col2[index] % nPowerVar)
        }

        for (let index1 = 0; index1 < col1.length; index1++) {

            let newLigne = document.createElement("tr")

            let row1 = document.createElement("td")
            row1.textContent = col1[index1]
            newLigne.appendChild(row1)

            let row2 = document.createElement("td")
            row2.textContent = col2[index1]
            newLigne.appendChild(row2)

            let row3 = document.createElement("td")
            row3.textContent = col3[index1]
            newLigne.appendChild(row3)

            let row4 = document.createElement("td")
            row4.textContent = col4[index1]
            newLigne.appendChild(row4)

            tablePowerVar.appendChild(newLigne)
        }
    }
}

//cahcher les explication euclide etendue 
let togg7 = document.getElementById("buttonPower");
let d7 = document.getElementById("divPower");

togg7.onclick = () => {
    if (getComputedStyle(d7).display != "none") {
        d7.style.display = "none";
        togg7.textContent = "► show explanations";
    } else {
        d7.style.display = "block";
        togg7.textContent = "▼ hide explanations";
    }
}

//trouver l'inverse
//
buttonNInverser.onclick = function() {
        let nInvererVar = nInverer.value
        let modInverserVar = modInverser.value
        if (nInvererVar == "" || modInverserVar == "") {
            alert("Il manque des informations")
        } else {
            alert("l'inversde de " + nInvererVar + " est " + calculateInverse(nInvererVar, modInverserVar))
        }
    }
    //cacher les explications
let togg6 = document.getElementById("buttonInverse");
let d6 = document.getElementById("divInverse");
togg6.onclick = () => {
    if (getComputedStyle(d6).display != "none") {
        d6.style.display = "none";
        togg6.textContent = "► show explanations";
    } else {
        d6.style.display = "block";
        togg6.textContent = "▼ hide explanations";
    }
}


//liste inverse
// 
invertibleListButton.onclick = function() {
    //il suffit de trouver la premiere moitiee des inverse 
    //le reste est simplement le symétrique 2 -> -2
    let listInvertible = []
    for (let index = 0; index < nInvList.value; index++) {
        const invVar = calculateInverse(index, nInvList.value)
        if (invVar != -666 && invVar != 0) {
            listInvertible.push(invVar)
        }
    }
    alert(listInvertible)
}
let togg5 = document.getElementById("buttonInverseList");
let d5 = document.getElementById("divInverseList");
//cacher les explication
togg5.onclick = () => {
    if (getComputedStyle(d5).display != "none") {
        d5.style.display = "none";
        togg5.textContent = "► show explanations";
    } else {
        d5.style.display = "block";
        togg5.textContent = "▼ hide explanations";
    }
}


//equation x^p[n]
//
eqButton.onclick = function() {
    if (pgcd(aEq.value, nEq.value) == 1) {
        alert("x = " + calculateInverse(aEq.value, nEq.value) * bEq.value)
    } else if (bEq.value % pgcd(aEq.value, nEq.value) == 0) {
        let solTab = []
        for (let index = 0; index < aEq.value - 1; index++) {
            solTab.push(bEq.value / aEq.value + nEq.value * index / aEq.value)
        }
        alert(solTab)
    } else alert("no solution")
}
let togg8 = document.getElementById("buttoneq");
let d8 = document.getElementById("divEq");
//cacher les explication
togg8.onclick = () => {
    if (getComputedStyle(d8).display != "none") {
        d8.style.display = "none";
        togg8.textContent = "► show explanations";
    } else {
        d8.style.display = "block";
        togg8.textContent = "▼ hide explanations";
    }
}




//cacher toutes les explication au chargement de la page
window.onload = () => {
    d1.style.display = "none";
    d2.style.display = "none";
    d3.style.display = "none";
    d4.style.display = "none";
    d5.style.display = "none";
    d6.style.display = "none";
    d7.style.display = "none";
    d8.style.display = "none";
}