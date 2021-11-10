const buttonSubmitData = document.getElementById("submitData")
const buttonASend = document.getElementById("aSend")
const buttonAReceives = document.getElementById("aReceives")
const buttonBSend = document.getElementById("bSend")
const buttonBReceives = document.getElementById("bReceives")
const buttonACheck = document.getElementById("aCheck")
const buttonBCheck = document.getElementById("bCheck")
const buttonASendSignature = document.getElementById("aSendSignature")
const buttonBSendSignature = document.getElementById("bSendSignature")


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
        return mod(vk[i - 2], modulo) //car en js -64%165 = 165 et non 101
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

function facteur(n) {
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

function checkPrimeFactor(n) {
    let decompose = facteur(n)
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

function checkInfo(n, e) {
    let d = calculateInverse(e, computeEuler(n))
    if (!checkPrimeFactor(n)) return false
    else if (pgcd(e, computeEuler(n)) != 1) return false
    else if (mod(e * d, computeEuler(n)) != 1) return false
    else return true
}

//En réalité cela ne choisi pas au hasard mais le premier e possible
function findRandomE(n) {
    for (let i = 2; i < computeEuler(n); i++) {
        if (pgcd(i, computeEuler(n)) == 1) return i
    }
    return -1;
}

//IL FAUT PENSER A QUI ENVOIE LE MESSAGE A QUI 
//A->B ou B->A
//x : message de type entier
//e, n : clef public du destinataire
function cipherRSAInt(x, e, n) {
    return puissance(x, e, n)
}

//x : message de type entier
//n : clef public du receveur
//d : clef privé du receveur
function decipherRSAInt(x, d, n) {
    return puissance(x, d, n)
}

function guessKey(e, n) {
    return calculateInverse(e, computeEuler(n))
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

function deciferRSAPenta(number, d, n, alphabet) {
    let num = decipherRSAInt(number, d, n)
    let coef = [0, 0, 0, 0, 0]
    for (let i = 0; i < 4; i++) {
        let stop = false
        while (!stop) {
            console.log(num)
            if (num - Math.pow(29, coef.length - i - 1) > 0) {
                coef[i] += 1
                num -= Math.pow(29, coef.length - i - 1)
            } else {
                coef[coef.length - 1] = num
                stop = true
            }
        }
    }
    return translateNumToMot(coef, alphabet)
}

function sendSignature(na, ea, sa, nb, eb) {
    let da = guessKey(ea, na)
    return puissance(puissance(sa, da, na), eb, nb)
}

function checkSignature(yab, db, nb, ea, na) {
    return puissance(puissance(yab, ea, na), db, nb)
}

//check data et guess key privé
function submitData() {
    let na = document.getElementById("na").value
    let ea = document.getElementById("ea").value
    let da = document.getElementById("da").value
    let nb = document.getElementById("nb").value
    let eb = document.getElementById("eb").value
    let db = document.getElementById("db").value
    if (na == "" || ea == ""  || nb == "" || eb == "" ) {
        alert("Il manque des informations")
    } else {
        if (checkInfo(na, ea) && checkInfo(nb, eb)) {
            alert("les informations des sujets A et B son correctes")
        } else if (checkInfo(na, ea)) {
            alert("les informations du sujet B son corrects")
        } else if (checkInfo(nb, eb)) {
            alert("les informations du sujet B son corrects")
        } else {
            alert("informations incorectes")
        }
        //complétion automatique des clefs privées si absentes
        if (da == "") {
            document.getElementById("da").value = guessKey(ea, na)
        }
        if (db == "") {
            document.getElementById("db").value = guessKey(eb, nb)
        }
    }

}

//DECRYPTER ET CRYPTER RSA 
//code redandant mais j'ai pas envie de me prendre la tête
buttonASend.onclick = function() {
    submitData()
    let nb = document.getElementById("nb").value
    let eb = document.getElementById("eb").value
    let plaintext = document.getElementById("plaintext").value
    document.getElementById("ciphertext").value = cipherRSAInt(plaintext, eb, nb)
}

buttonBSend.onclick = function() {
    submitData()
    let na = document.getElementById("na").value
    let ea = document.getElementById("ea").value
    let plaintext = document.getElementById("plaintext").value
    document.getElementById("ciphertext").value = cipherRSAInt(plaintext, ea, na)
}

buttonAReceives.onclick = function() {
    submitData()
    let na = document.getElementById("na").value
    let da = document.getElementById("da").value
    let ciphertext = document.getElementById("ciphertext").value
    document.getElementById("plaintext").value = decipherRSAInt(ciphertext, da, na)
}

buttonBReceives.onclick = function() {
    submitData()
    let nb = document.getElementById("nb").value
    let db = document.getElementById("db").value
    let ciphertext = document.getElementById("ciphertext").value
    document.getElementById("plaintext").value = decipherRSAInt(ciphertext, db, nb)
}



//Signature
buttonSubmitData.onclick = submitData