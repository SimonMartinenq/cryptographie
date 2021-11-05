

def isPrime(n):
    if n == 2 or n == 3: return True
    if n < 2 or n%2 == 0: return False
    if n < 9: return True
    if n%3 == 0: return False
    r = int(n**0.5)
    f = 5
    while f <= r:
        print('\t',f)
        if n % f == 0: return False
        if n % (f+2) == 0: return False
        f += 6
    return True

   
def pgcd(a,b) :
    rk = []

    rk.append(a)
    rk.append(b)
    
    stop = False
    i=2
    while(stop!=True):

        rk.append(rk[i-2]%rk[i-1])
        if(rk[i]==0): stop = True
        i+=1
        
    return rk[i-2]

##reviens a calculer le nombre d'élément inverssible
def computeEuleur(n): 
    count = 0
    for i in range(n):
        if pgcd(i,n)==1:
            count += 1
    return count

#print(computeEuleur(165))
#print(computeEuleur(73277933))       
    
def calculerInverse(a,mod):
    uk = []
    vk = []
    rk = []
    qk = [0] * 2

    if pgcd(a, mod)==1 :
        uk.append(1)
        uk.append(0)
        vk.append(0)
        vk.append(1)
        rk.append(mod)
        rk.append(a)
        
        stop = False
        i=2
        while(stop!=True):
            rk.append(rk[i-2]%rk[i-1])
            qk.append(int(rk[i-2]/rk[i-1]))
            uk.append(uk[i-2]-qk[i]*uk[i-1])
            vk.append(vk[i-2]-qk[i]*vk[i-1])
            if(rk[i]==0): stop = True
            i+=1
        return vk[i-2]%mod
    else:
        return "no inverse"

#print(calculerInverse(23,120))

def facteurs(n):
    decompose = []
    d = 2
    while d<=n:
       if n%d==0:
            decompose.append(d)
            n=n/d
       else : 
           d=d+1
    return decompose

print(facteurs(10))

def checkPrimeFactor(n):
    decompose = facteurs(n)
    isFactor = True
    for i in range(len(decompose)):
        for j in range(i+1,len(decompose)):
            if(decompose[i]==decompose[j]):
                isFactor = False     
    return isFactor

def solveEq(e,y,n):
    #suelement si n est premier ou produit de facteur premier
    
    isFactor = checkInfo(n)
    
    if isFactor:
        d=calculerInverse(e,computeEuleur(n))
        return pow(y,d)%n
    else : return "no solution"
    
#print(solveEq(5,41,65))

def findRandomE(n):
    for i in range(2,computeEuleur(n)):
        if(pgcd(i,computeEuleur(n))==1):
            return i
        
#print(findRandomE(85))

def checkInfo(n, e):
    d = calculerInverse(e,computeEuleur(n))
    if checkPrimeFactor(n) != True: return False;
    elif pgcd(e, computeEuleur(n)) != 1 :return False;
    elif e*d%computeEuleur(n) != 1 : return False;

#x : message de type entier
#e, n : clef public du destinataire
def cipherRSAInt(x,e,n):
    return pow(x,e)%n 

#print(cipherRSAInt(12,7,143))  #12
#print(cipherRSAInt(3,77,187))  #12


#x : message de type entier
#n : clef public du receveur
#d : clef privé du receveur
def decipherRSAInt(x,d,n):
    return pow(x,d,n)  
    
#print(decipherRSAInt(50,27,55))
#print(decipherRSAInt(10,29,133))
#print(decipherRSAInt(12,51,85))

def guessKey(e,n):
    return calculerInverse(e,computeEuleur(n))

#print(guessKey(13,209))


alphabet = "abcdefghijklmnopqrstuvwxyz ."
def translateMotToNum(mots, alphabet):
    
    numMot = []
    for lettre in mots:
        i=1
        for a in alphabet:
            if a==lettre:
                numMot.append(i)
            i = i+ 1
    return numMot


def translateNumToMot(num, alphabet):
    numMot = []
    for n in num:
        i = 1
        for a in alphabet:
            if i==n:
                numMot.append(a)
            i = i + 1
    return numMot

## REVOIR 2 LETTRES PAUSE PROBLEME N ET I 
#message corresmonding with αβγδε −→ Nα294 + Nβ293 + Nγ292 + Nδ29 + Nε
def deciferRSAPenta(number,d,n, alphabet):
    number = decipherRSAInt(number,d,n)   
    coef = [0]*5
    
    for i in range(4):
        stop = False
        while(stop == False):
            if number-pow(29,len(coef)-i-1) > 0 :
                coef[i] += 1
                number -= pow(29,len(coef)-i-1)
            else: 
                coef[len(coef)-1] = number
                stop = True

    return translateNumToMot(coef,alphabet)

    
#print(deciferRSAPenta(3698031,1,1,alphabet))  #efrei
#vous obtenez deux point de bonus
''' print(deciferRSAPenta(46509674,23719,73277933,alphabet))
print(deciferRSAPenta(32695436,23719,73277933,alphabet))
print(deciferRSAPenta(59842725,23719,73277933,alphabet))
print(deciferRSAPenta(66944637,23719,73277933,alphabet))
print(deciferRSAPenta(2073634,23719,73277933,alphabet))
print(deciferRSAPenta(8438724,23719,73277933,alphabet))
print(deciferRSAPenta(389483,23719,73277933,alphabet))
 '''
 
#nA = 73277933, dA = 23719

#nA <= nB
def sendSignature(nA,eA,dA,sA,nB,eB):
    dA = guessKey(eA,nA)
    return pow(pow(sA,dA,nA),eB,nB)

#print(sendSignature(209,13,0,10,221,25))

#nA >= nB # attention ordre des parametres 
def checkSignature(yAB,dB,nB,eA,nA):
    return pow(pow(yAB,eA,nA),dB,nB)

#print(checkSignature(98,97,209,25,221)) # sB=21 ok

n = 75
count = 0
for i in range(1,n+1):
    if n%i==0:
        count += computeEuleur(i)
    
#print(count)
    

