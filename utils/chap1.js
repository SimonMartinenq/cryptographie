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

isPrimeButton.onclick = function() {
    const n = nbrPremier.value
    if (isPrime(n)) {
        alert("le nombre EST premier")
    } else {
        alert("le nombre N'EST PAS premier")
    }

}
pgcdButton.onclick = function() {
    alert("coucou")
}
factorisationButton.onclick = function() {
    alert("coucou")
}
euclideEtenduButton.onclick = function() {
    alert("coucou")
}
powerButton.onclick = function() {
    alert("coucou")
}
invertibleListButton.onclick = function() {
    alert("coucou")
}
eqButton.onclick = function() {
    alert("coucou")
}