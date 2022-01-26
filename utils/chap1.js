// penser un fichier js avec juste les fonctions pour tous les chapitres

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
        return vk[i - 2]
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
pgcdButton.onclick = function() {
    const varPgcd = pgcd(aPgcd.value, bPgcd.value)
    if (varPgcd == 1) {
        alert("Le pgcd de " + aPgcd.value + " et " + bPgcd.value + " est: " + varPgcd + ", il sont premier entre eux")
    } else {
        alert("Le pgcd de " + aPgcd.value + " et " + bPgcd.value + " est: " + varPgcd)
    }
}
factorisationButton.onclick = function() {
    //en déduire le nombre de diviseurs
    alert("Les facteurs premiers sont: " + primeFacor(primeFactorisation.value))
}

//cacher les ecplications
let togg3 = document.getElementById("buttonPrimeFactor");
let d3 = document.getElementById("divPrimeFactor");

togg3.addEventListener("click", () => {
    if (getComputedStyle(d3).display != "none") {
        d3.style.display = "none";
    } else {
        d3.style.display = "block";
    }
})

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
            let row1 = document.createElement("td")
            row1.textContent = rk[i - 2] % rk[i - 1]
            newLigne.id = i
            newLigne.appendChild(row1)
            rk[i] = rk[i - 2] % rk[i - 1]

            let row2 = document.createElement("td")
            row2.textContent = Math.floor(rk[i - 2] / rk[i - 1])
            newLigne.appendChild(row2)
            qk[i] = Math.floor(rk[i - 2] / rk[i - 1])

            let row3 = document.createElement("td")
            row3.textContent = uk[i - 2] - qk[i] * uk[i - 1]
            newLigne.appendChild(row3)
            uk[i] = uk[i - 2] - qk[i] * uk[i - 1]

            let row4 = document.createElement("td")
            row4.textContent = vk[i - 2] - qk[i] * vk[i - 1]
            newLigne.appendChild(row4)
            vk[i] = vk[i - 2] - qk[i] * vk[i - 1]

            tableEuclideEtendueVar.appendChild(newLigne)
            if (rk[i] == 0) stop = true
            i += 1
        }
        //return mod(vk[i - 2], modulo)
    } else alert("il manque des variables")
        //else return -1


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
    return valeurs
}


powerButton.onclick = function() {
    let xPowerVar = xPower.value
    let pPowerVar = pPower.value
    let nPowerVar = nPower.value
    let tablePowerVar = tablePower
    const decompoP = decPuiss2(xPowerVar).sort((a, b) => a - b)

    //supprimer les calculs precedent
    while (tablePowerVar.rows.length > 2) {
        tablePowerVar.deleteRow(2);
    }

    decompoP.forEach(element => {
        let newLigne = document.createElement("tr")

        let row1 = document.createElement("td")
        row1.textContent = element
        newLigne.appendChild(row1)

        let row2 = document.createElement("td")
        row2.textContent = Math.pow(element, 2)
        newLigne.appendChild(row2)

        tablePowerVar.appendChild(newLigne)
    });



}



buttonNInverser.onclick = function() {
    let nInvererVar = nInverer.value
    let modInverserVar = modInverser.value
    if (nInvererVar == "" || modInverserVar == "") {
        alert("Il manque des informations")
    } else {
        alert(calculateInverse(nInvererVar, modInverserVar))
    }
}

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

//cacher les explications
let togg1 = document.getElementById("buttonExpPrime");
let d1 = document.getElementById("divExpPrime");

togg1.addEventListener("click", () => {
    if (getComputedStyle(d1).display != "none") {
        d1.style.display = "none";
    } else {
        d1.style.display = "block";
    }
})

let togg2 = document.getElementById("buttonExpPgcd");
let d2 = document.getElementById("divExpPgcd");

function togg() {
    if (getComputedStyle(d2).display != "none") {
        d2.style.display = "none";
    } else {
        d2.style.display = "block";
    }
}

togg2.onclick = togg;