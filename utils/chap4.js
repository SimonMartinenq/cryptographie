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

function mod(a, n) {
    var m = ((a % n) + n) % n;
    return m < 0 ? m + Math.abs(n) : m;
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
        uk[0] = (1)
        uk[1] = (0)
        vk[0] = (0)
        vk[1] = (1)
        rk[0] = (modulo)
        rk[1] = (a)

        stop = false
        let i = 2
        while (!stop) {
            rk[i] = rk[i - 2] % rk[i - 1]
            qk[i] = Math.floor(rk[i - 2] / rk[i - 1])
            uk[i] = uk[i - 2] - qk[i] * uk[i - 1]
            vk[i] = vk[i - 2] - qk[i] * vk[i - 1]
            if (rk[i] == 0) stop = true
            i += 1
        }
        return mod(vk[i - 2], modulo)
    } else return -1
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

/* CHAPITRE 4 */
/* EN COURS DE TRAVAIL = MARCHE PAS */
function checkGenerator(g, n) {
    ////determine the order
    //max k
    let maxK = computeEuler(n)
    console.log("maxk = " + maxK)
    let factors = factor(maxK)
    console.log("facteurs = " + factors)
    let isGenerator = false;
    factors.forEach(element => {
        if (puissance(g, element, n) == 1 && element == maxK) {
            console.log(puissance(g, element, n) + " " + element)
            isGenerator = true
        }
    });
    return isGenerator
}


//check data et guess key privé
function submitData() {
    let p = document.getElementById("p").value
    let g = document.getElementById("g").value
    let ea = document.getElementById("ea").value
    let eb = document.getElementById("eb").value
    let da = document.getElementById("da").value
    let db = document.getElementById("db").value

    if (p == "" && g == "") {
        alert("Il manque des informations")
    } else if (!checkGenerator(g, p)) {
        alert(g + " n'est pas un générateur")
    } else {
        alert("data are ok")
            //sujet A
        if (ea != "" && da == "") {
            document.getElementById("da").value = findPrivateElgamal(ea, g, p)
        } else if (da != "" && ea == "") {
            document.getElementById("ea").value = findPublicKeyElgamal(g, da, p)
        }

        //sujet B
        if (eb != "" && db == "") {
            document.getElementById("db").value = findPrivateElgamal(eb, g, p)
        } else if (db != "" && eb == "") {
            document.getElementById("eb").value = findPublicKeyElgamal(g, db, p)
        }
    }


}



function cipherElgamal(g, x, eReceveur, n, k) {
    //choisir k au hasard
    //const k = Math.floor(Math.random() * (n - 1)) + 1

    const r = puissance(g, k, n)
    const y = mod(x * puissance(eReceveur, k, n), n)
    return [r, y]
}

function decipherElgamal(r, y, dReceveur, n) {
    let step1 = puissance(r, dReceveur, n)
    console.log(step1)
    let step2 = calculateInverse(step1, n)
    console.log(step1)
    return mod(y * step2, n)
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


buttonSubmitData.onclick = submitData
    //DECRYPTER ET CRYPTER RSA 
    //code redondant mais j'ai pas envie de me prendre la tête

buttonASend.onclick = function() {
    submitData()
    let g = document.getElementById("g").value
    let k = document.getElementById("k").value
    let eb = document.getElementById("eb").value
    let p = document.getElementById("p").value
    let x = document.getElementById("x").value
    document.getElementById("r").value = cipherElgamal(g, x, eb, p, k)[0]
    document.getElementById("y").value = cipherElgamal(g, x, eb, p, k)[1]
}

buttonBSend.onclick = function() {
    submitData()
    let g = document.getElementById("g").value
    let k = document.getElementById("k").value
    let ea = document.getElementById("ea").value
    let p = document.getElementById("p").value
    let x = document.getElementById("x").value
    document.getElementById("r").value = cipherElgamal(g, x, ea, p, k)[0]
    document.getElementById("y").value = cipherElgamal(g, x, ea, p, k)[1]
}

buttonAReceives.onclick = function() {
    submitData()
    let r = document.getElementById("r").value
    let da = document.getElementById("da").value
    let p = document.getElementById("p").value
    let y = document.getElementById("y").value
    document.getElementById("x").value = decipherElgamal(r, y, da, p)
}

buttonBReceives.onclick = function() {
    submitData()
    let r = document.getElementById("r").value
    let db = document.getElementById("db").value
    let p = document.getElementById("p").value
    let y = document.getElementById("y").value
    document.getElementById("x").value = decipherElgamal(r, y, db, p)
}

buttonASendSignature.onclick = function() {
    submitData()
    let eb = document.getElementById("eb").value
    let da = document.getElementById("da").value
    let na = document.getElementById("na").value
    let nb = document.getElementById("nb").value
    let sa = document.getElementById("sa").value
    if (sa != "") {
        document.getElementById("messageToSend").value = sendSignature(na, da, sa, nb, eb)
    } else alert("Signature manquante")
}

buttonBSendSignature.onclick = function() {
    submitData()
    let db = document.getElementById("db").value
    let ea = document.getElementById("ea").value
    let na = document.getElementById("na").value
    let nb = document.getElementById("nb").value
    let sb = document.getElementById("sb").value
    if (sb != "") {
        document.getElementById("messageToSend").value = sendSignature(nb, db, sb, na, ea)
    } else alert("Signature manquante")
}

buttonACheck.onclick = function() {
    submitData()
    let yba = document.getElementById("messageToCheck").value
    let da = document.getElementById("da").value
    let na = document.getElementById("na").value
    let eb = document.getElementById("eb").value
    let nb = document.getElementById("nb").value
    let sb = document.getElementById("sb").value
    if (sb != "") {
        if (sb == checkSignature(yba, da, na, eb, nb)) {
            alert("Le message envoyé est CORECTE")
        } else {
            alert("Le message envoyé est INCORECTE")
        }
    } else alert("Signature manquante")
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


/* buttonNInverser.onclick = function() {
    let nInverer = document.getElementById("nInverer").value
    let modInverser = document.getElementById("modInverser").value
    if (nInverer == "" || modInverser == "") {
        alert("Il manque des informations")
    } else {
        alert(calculateInverse(nInverer, modInverser))
    }
} */

buttonResoudreEquation.onclick = function() {
    let p = document.getElementById("pEquation").value
    let y = document.getElementById("yEquation").value
    let modEq = document.getElementById("modEquation").value

    if (p == "" || y == "" || modEq == "") {
        alert("Il manque des informations")
    } else {
        alert("x = " + solveEq(p, y, modEq))
    }

}