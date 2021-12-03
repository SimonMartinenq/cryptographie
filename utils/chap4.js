const buttonSubmitData = document.getElementById("submitData")
const buttonASend = document.getElementById("aSend")
const buttonAReceives = document.getElementById("aReceives")
const buttonBSend = document.getElementById("bSend")
const buttonBReceives = document.getElementById("bReceives")
const buttonACheck = document.getElementById("aCheck")
const buttonBCheck = document.getElementById("bCheck")
const buttonASendSignature = document.getElementById("aSendSignature")
const buttonBSendSignature = document.getElementById("bSendSignature")
const buttonComputeEuler = document.getElementById("computeEulerButton")
const buttonComputeEulerPuissance = document.getElementById("computeEulerPuissanceButton")
const buttonNInverser = document.getElementById("buttonNInverser")
const buttonResoudreEquation = document.getElementById("buttonResoudreEquation")
const buttonDecipherPenta = document.getElementById("buttonDecipherPenta")

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
/* 
function mod(a, n) {
    var m = ((a % n) + n) % n;
    return m < 0 ? m + Math.abs(n) : m;
} */

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

function computeEuler(nEuler) {
    let count = 0
    for (let i = 0; i < nEuler; i++) {
        if (pgcd(i, nEuler) == 1) count += 1
    }
    return count
}

function calculateInverse(a, modulo) {
    let uk = []
    let vk = []
    let rk = []
    let qk = [0, 0]

    if (pgcd(a, modulo) == 1) {
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

//Math.pow ne prend pas en compte le modulo
function puissance(nombre, exposant, modulo) {
    let finish = false
    let count = 1
    while (!finish) {
        if (exposant == 0) finish = true
        else {
            count = (count * nombre) % modulo
            exposant -= 1
        }
    }
    return count
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

//liste les diviseurs de n
function factor(n) {
    let decompose = []
    let j = 0
    for (let i = 1; i <= n; i++) {
        if (n % i == 0) {
            decompose[j] = i
            j++
        }
    }
    return decompose
}

function checkPrimeFactor(n) {
    let decompose = primeFacor(n)
    let isFactor = true
    for (let i = 0; i < decompose.length; i++) {
        for (let j = i + 1; j < decompose.length; j++) {
            if (decompose[i] == decompose[j]) isFactor = false
        }
    }
    return isFactor
}

function solveEq(e, y, n) {
    //suelement si n est premier ou produit de facteur premier
    let isFactor = checkPrimeFactor(n)
    if (isFactor) {
        let d = calculateInverse(e, computeEuler(n))
        return puissance(y, d, n)
    } else return "no solution"
}

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


//determine l'order d'un nombre ex : Ord(2) dans Z/19Z = 18
function order(number, modulo) {
    if (number == 1) {
        return 1
    } else {
        let listOrdersPossible = factor(computeEuler(modulo))
            //enlever le 1 du debut
        let tmp = listOrdersPossible.reverse()
        tmp.pop()
        listOrdersPossible = tmp.reverse()
        for (const ordre of listOrdersPossible) {
            if (puissance(number, ordre, modulo) == 1) return ordre
        }
    }

}

//trouver les générateurs d'une classe
function findGenerator(n) {
    let elements = []
    let orderElements = []
        //création d'un tableaux  avec deux lignes : elements et leurs ordres

    for (let i = 1; i < computeEuler(n); i++) {
        elements.push(i)
        orderElements.push(order(i, n))
    }
    // pour ensuite reperer le ou les éléments avec le plus grand ordre
    // qui sont le ou les générateurs
    //trouver le max
    let max = 0
    for (const maxPointer of orderElements) {
        if (maxPointer > max) max = maxPointer
    }

    let generator = []
    for (let i = 0; i < elements.length; i++) {
        if (orderElements[i] == max) {
            generator.push(elements[i])
        }

    }
    return generator
}

//déterminer si un nombre est générateur d'une classe
function isGenerator(g, n) {
    let generators = findGenerator(n)
    for (const tmp of generators) {
        if (g == tmp) {
            return true
        }
    }
    return false
}

//check data et guess key privé
function submitData() {
    let p = pTable.value
    let g = gTable.value
    let ea = eaTable.value
    let eb = ebTable.value
    let da = daTable.value
    let db = dbTable.value

    if (p == "" && g == "") {
        alert("Il manque des informations")
        return 1 //erreur 
    } else if (!isGenerator(g, p)) {
        alert(g + " n'est pas un générateur")
        return 1 //erreur
    } else {
        //sujet A
        if (ea != "" && da != "" && da == findPrivateElgamal(ea, g, p)) {
            alert("Les informations de A sont CORRECTES")
        } else if (ea != "" && da == "") {
            daTable.value = findPrivateElgamal(ea, g, p)
            alert("Les informations de A sont CORRECTES")
        } else if (da != "" && ea == "") {
            eaTable.value = findPublicKeyElgamal(g, da, p)
            alert("Les informations de A sont CORRECTES")
        } else {
            alert("Les informations de A sont INCORRECTES")
        }

        //sujet B
        if (eb != "" && db != "" && db == findPrivateElgamal(eb, g, p)) {
            alert("Les informations de B sont CORRECTES")
        } else if (eb != "" && db == "") {
            dbTable.value = findPrivateElgamal(eb, g, p)
            alert("Les informations de B sont CORRECTES")
        } else if (db != "" && eb == "") {
            ebTable.value = findPublicKeyElgamal(g, db, p)
            alert("Les informations de B sont CORRECTES")
        } else {
            alert("Les informations de B sont INCORRECTES")
        }
    }


}


function cipherElgamal(g, x, eReceveur, n, k) {
    //choisir k au hasard
    //const k = Math.floor(Math.random() * (n - 1)) + 1

    const r = puissance(g, k, n)
    const y = (x * puissance(eReceveur, k, n)) % n
    return [r, y]
}

function decipherElgamal(r, y, dReceveur, n) {
    let step1 = puissance(r, dReceveur, n)
    let step2 = calculateInverse(step1, n)
    return (y * step2) % n
}

function findPublicKeyElgamal(g, d, n) {
    return puissance(g, d, n)
}

function findPrivateElgamal(e, g, n) {
    let tmp
    let i = 1
    while (tmp != e) {
        tmp = puissance(g, i, n)
        i++
    }
    return i - 1
}

function sendSignature(g, k, p, dEnvoyeur, sEnvoyeur, q) {
    const r = puissance(g, k, p)
    const s = calculateInverse(k) * (sEnvoyeur + r * dEnvoyeur) % q
    const yab = s * puissance(eReceveur, k, p) % p
    return [r, yab]
}

function checkSignature(yab, r, dReceveur, p, q, sEnvoyeur, g, eEnvoyeur) {
    const s = yab * calculateInverse(puissance(r, dReceveur, p), p) % p
    const u1 = calculateInverse(s, q) * sEnvoyeur % q
    const u2 = calculateInverse(s, q) * r % q
    const r2 = puissance(g, u1, p) * puissance(eEnvoyeur, u2, p)
    if (r == r2) return true
    return false
}

buttonSubmitData.onclick = submitData


buttonASend.onclick = function() {
    submitData()
    const g = gTable.value
    const k = kCryptage.value
    const eb = ebTable.value
    const n = pTable.value
    const x = xCryptage.value
    document.getElementById("rCryptage").value = cipherElgamal(g, x, eb, n, k)[0]
    document.getElementById("yCryptage").value = cipherElgamal(g, x, eb, n, k)[1]


}

buttonBSend.onclick = function() {
    submitData()
    const g = gTable.value
    const k = kCryptage.value
    const ea = eaTable.value
    const p = pTable.value
    const x = xCryptage.value
    document.getElementById("rCryptage").value = cipherElgamal(g, x, ea, p, k)[0]
    document.getElementById("yCryptage").value = cipherElgamal(g, x, ea, p, k)[1]
}

buttonAReceives.onclick = function() {
    submitData()
    const r = rCryptage.value
    const y = yCryptage.value
    const da = daTable.value
    const p = pTable.value
    document.getElementById("xCryptage").value = decipherElgamal(r, y, da, p)
}

buttonBReceives.onclick = function() {
    const r = rCryptage.value
    const y = yCryptage.value
    const db = dbTable.value
    const p = pTable.value
    document.getElementById("xCryptage").value = decipherElgamal(r, y, db, p)
}

buttonASendSignature.onclick = function() {
    const erreur = submitData()
    if (erreur != 1) {
        const g = gTable.value
        const k = kCryptage.value
        const p = pTable.value
        const da = daTable.value
        const sa = saTable.value
        const q = qTable.value
        messageToSend.value = sendSignature(g, k, p, da, sa, q)
    } else {
        return 1
    }
}

buttonBSendSignature.onclick = function() {
    const erreur = submitData()
    if (erreur != 1) {
        const g = gTable.value
        const k = kCryptage.value
        const p = pTable.value
        const db = dbTable.value
        const sb = sbTable.value
        const q = qTable.value
        messageToSend.value = sendSignature(g, k, p, db, sb, q)
    } else {
        return 1
    }
}

buttonACheck.onclick = function() {
    const erreur = submitData()
    const yab = ySignature.value
    const r = rSignature.value
    const da = daTable.value
    const p = pTable.value
    const q = qTable.value
    const sb = sbTable.value
    const g = gTable.value
    const eb = ebTable.value
    if (erreur != 1) {
        alert("La signature est : " + checkSignature(yab, r, da, p, q, sb, g, eb))
    } else {
        return 1
    }
}

buttonBCheck.onclick = function() {
    submitData()
    let yab = document.getElementById("messageToCheck").value
    let db = document.getElementById("db").value
    let na = document.getElementById("na").value
    let ea = document.getElementById("ea").value
    let nb = document.getElementById("nb").value
    let sa = document.getElementById("sa").value
    if (sa != "") {

        if (sa == checkSignature(yab, db, nb, ea, na)) {
            alert("Le message est CORECTE")
        } else {
            alert("Le message est INCORECTE")
        }
    } else alert("Signature manquante")
}
buttonComputeEuler.onclick = function() {
    let n = document.getElementById("nEuler").value
    if (n == "") {
        alert("Il manque des infromations")
    } else {
        alert("Le nombre d'éléments inverssible est: " + computeEuler(n))
    }

}

buttonComputeEulerPuissance.onclick = function() {
    let n = document.getElementById("nombrePuissance").value
    let p = document.getElementById("puissance").value
    let modp = document.getElementById("moduloEuler").value
    if (n == "" || p == "" || modp == "") {
        alert("Il manque des informations")
    } else {
        alert("Le résultat est: " + puissance(n, p, modp))
    }
}

buttonNInverser.onclick = function() {
    let nInverer = document.getElementById("nInverer").value
    let modInverser = document.getElementById("modInverser").value
    if (nInverer == "" || modInverser == "") {
        alert("Il manque des informations")
    } else {
        alert(calculateInverse(nInverer, modInverser))
    }
}

/* buttonResoudreEquation.onclick = function() {
    let p = document.getElementById("pEquation").value
    let y = document.getElementById("yEquation").value
    let modEq = document.getElementById("modEquation").value

    if (p == "" || y == "" || modEq == "") {
        alert("Il manque des informations")
    } else {
        alert("x = " + solveEq(p, y, modEq))
    }

}
 */
buttonCalculerOrdre.onclick = () => {
    //let nombre = document.getElementById("numberOrder").value
    let nombre = numberOrder.value
    let modulo = document.getElementById("moduloOrder").value
    alert(order(nombre, modulo))
}

isGeneratorButton.onclick = () => {
    let g = document.getElementById("generator").value
    let modulo = document.getElementById("moduloGenerator").value
    if (g != "" || modulo != "") {
        let reponse = isGenerator(g, modulo)
        if (reponse) alert(g + " EST un générateur de " + modulo)
        else alert(g + " N'EST PAS un générateur de " + modulo)
    }
}

listGeneratorButton.onclick = () => {
    let modulo = document.getElementById("moduloGenerator").value
    alert("The generator(s) of " + modulo + " : " + findGenerator(modulo))
}