const buttunComputeEuler = document.getElementById("computeEuler")

function isPrime(n) {
    if (n == 2 || n == 3) return true
    if (n < 2 || n % 2 == 0) return false
    if (n < 9) return true
    if (n % 3 == 0) return false
    r = int(n ** 0.5)
    f = 5
    while (f <= r) {
        print('\t', f)
    }
    if (n % f == 0) return false
    if (n % (f + 2) == 0) return false
    f += 6
    return true
}

function pgcd(a, b) {
    let rk = [a, b]

    let stop = false
    let i = 2
    while (stop != true) {
        rk.push(rk[i - 2] % rk[i - 1])
        if (rk[i] == 0) stop = true
        i += 1
    }
    return rk[i - 2]
}

function computeEuler() {
    const nEuler = document.querySelector("#nEuler").value
    count = 0
    for (let i = 0; i < nEuler; i++) {
        if (pgcd(i, nEuler) == 1) count += 1
    }
    console.log(count)
}

function calculateInverse(a, mod) {
    let uk = []
    let vk = []
    let rk = []
    let qk = [0, 0]

    if (pgcd(a, mod) == 1) {
        uk[0] = (1)
        uk[1] = (0)
        vk[0] = (0)
        vk[1] = (1)
        rk[0] = (mod)
        rk[1] = (a)

        stop = false
        let i = 2
        while (stop != true) {
            rk[i] = rk[i - 2] % rk[i - 1]
            qk[i] = Math.floor(rk[i - 2] / rk[i - 1])
            uk[i] = uk[i - 2] - qk[i] * uk[i - 1]
            vk[i] = vk[i - 2] - qk[i] * vk[i - 1]
            if (rk[i] == 0) stop = true
            i += 1
        }
        return (vk[i - 2] + mod) % mod //car en js -64%165 = 165 et non 101
    } else return -1
}

//Math.pow pas assez puissant
function puissance(nombre, exposant, modulo) {
    finish = false
    count = 1
    while (finish == false) {
        if (exposant == 0) finish = true
        else {
            count = (count * nombre) % modulo
            exposant -= 1
        }
    }
    return count
}

function facteur(n) {
    decompose = []
    d = 2
    i = 0
    while (d <= n) {
        if (n % d == 0) {
            decompose[i] = d
            n = Math.floor(n / d)
            i += 1
        } else d = d + 1
    }
    return decompose
}

buttunComputeEuler.onclick = computeEuler