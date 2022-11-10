// import guerrier from './classes/guerrier.js';
// import magicien from './classes/magicien.js';
// import monstre from './classes/monstre.js';

// const bob = new Guerrier("Bob", 0);
// const valentin = new Magicien("Valou", 0); // il a une attaque boule de feu qui inflige 60 dommages magiques

// const gobelinGuluk = new Gobelin("Guluk", 50); // possibilité de faire une classe gobelin pour lui donner de nouvelles propriétés, exemple gobelin archer.
// const racaillou = new Monstre("Racaillou", 60, 15, 30, 20); // défenseur
// const enderman = new Monstre("Enderman", 100, 40, 20, 50); // c'est un mini boss


// valentin.bouleDeFeu(gobelinGuluk);
// valentin.bouleDeFeu(gobelinGuluk);
// valentin.bouleDeFeu(gobelinGuluk);
// valentin.bouleDeFeu(gobelinGuluk);
// valentin.bouleDeFeu(gobelinGuluk);
// valentin.bouleDeFeu(gobelinGuluk);
// console.log("Vie de " + gobelinGuluk.nom + ": " + gobelinGuluk.vie);
// console.log("Il te reste " + valentin.mana + " points de mana");

let joueur;
let pseudo;

let monstre;

let playerTurn = true;
let monstreCont = {
    
};

// initialisation 
function choixJoueur(type) {
    console.log(type);
    pseudo = document.getElementById("InputName").value;

    if (pseudo != ""){

        if(type === "Magicien"){
            joueur = new Magicien(pseudo, 0);
        }else if(type === "Guerrier"){
            joueur = new Guerrier(pseudo, 0);
        }
        
        console.log(pseudo);

        $('#starter').hide();
        $('#game').show();

        genererMonstre();
        refreshInfoCombat();
        gererTour();

    }else{
        alert("Choissez un pseudo");
    }
}

function affichageTexteBarre(barreID, texte, valeur) {
    let barreJoueur = document.getElementById(barreID);

    let pId = barreID + "p";
    let p = document.getElementById(pId);

    if(p == null){
        p = document.createElement("p");
        p.id = pId;
        p.className="barreTexte";
        barreJoueur.getElementsByClassName("rpgui-progress-track")[0].append(p);
    }

    p.innerHTML=texte;
	RPGUI.set_value(barreJoueur, valeur);
}

function affichageInfoJoueur(){
    document.getElementById('nom').innerHTML = joueur.nom;
    // document.getElementById('vie').innerHTML = joueur.vie + "/" + joueur.vieMax;
    document.getElementById('attaque').innerHTML = joueur.attaque;
    document.getElementById('defense').innerHTML = joueur.defense;
    document.getElementById('experience').innerHTML = joueur.experience;
    document.getElementById('niveau').innerHTML = joueur.niveau;
    document.getElementById("imgJoueur").src = joueur.img;
    affichageTexteBarre("barreVieJoueur", "Vie :" + joueur.vie + "/" + joueur.vieMax, joueur.vie/joueur.vieMax);
    document.getElementById('argent').innerHTML = joueur.argent;
    document.getElementById('potionSoin').innerHTML = joueur.potionSoin;

    // test magicien
    if(isMagicien()){
        document.getElementById('barreManaJoueur').style = 'display: block;';
        // document.getElementById('manaP').style = 'display: block;';
        // document.getElementById('mana').innerHTML = joueur.mana + "/" + joueur.manaMax;
        document.getElementById('btnBouleDeFeu').style = 'display: inline-block';
        affichageTexteBarre("barreManaJoueur", "Mana :" +joueur.mana + "/" + joueur.manaMax,joueur.mana/joueur.manaMax);
    } 
    // test guerrier
    else {
        document.getElementById('barreManaJoueur').style = 'display: none';
        // document.getElementById('manaP').style = 'display: none';
        document.getElementById('btnBouleDeFeu').style = 'display: none';
    }
}

function affichageInfoMonstre(){
    document.getElementById('nomMonstre').innerHTML = monstre.nom;
    document.getElementById('vieMonstre').innerHTML = monstre.vie + "/" + monstre.vieMax;
    document.getElementById('attaqueMonstre').innerHTML = monstre.attaque;
    document.getElementById('defenseMonstre').innerHTML = monstre.defense;
    document.getElementById('imgMonstre').src = monstre.img;
}

function genererMonstre(){
    switch(Math.floor(Math.random() * 3)){
        case 0:
            monstre = new Gobelin("Guluk", 50);
            break;
        case 1:
            monstre = new Monstre("Racaillou", 60, 15, 15, 20, "./assets/racaillou.png", 15);
            break;
        case 2:
            monstre = new Monstre("Enderman", 100, 30, 10, 50, "./assets/enderman.png", 30);
            break;
        default:
            monstre = new Gobelin("Guluk", 50);
    }
    console.log(monstre);
    affichageInfoMonstre();
}

function attaque(){
    //monstre.vie -= joueur.attaque;
    monstre.infligerDegat(joueur.attaque);
    playerTurn = false;
    refreshInfoCombat();
    gererTour();
}

function verifMort(){
    if(monstre.vie <= 0){

        monstre.vie = 0;
        monstreCont += monstre.nom + " "
        console.log("monstre conteur", monstreCont)

        joueur.experience += monstre.experienceDonnee;
        joueur.argent += monstre.argentDonne;
        console.log("Vous avez tué " + monstre.nom);
        checkLevelUp();
        genererMonstre();
    }
    if(joueur.vie <= 0){
        joueur.vie = 0;
        afficherGameOver(true)
    }
}


function bouleDeFeu(){
    const attaqueLancee = joueur.bouleDeFeu(monstre);
    if(attaqueLancee){
        playerTurn = false;
        refreshInfoCombat();
        gererTour();
    }
}

function refreshInfoCombat(){
    affichageInfoMonstre();
    verifMort();
    affichageInfoJoueur();
    affichageActionCombat();
}

function gererTour(){
    if (!playerTurn) {
        attaqueDeAdversaire();
    }
}

function affichageActionCombat(){
    if (playerTurn){
        document.getElementById('actionCombat').style = 'display: flex';
        document.getElementById('utiliserPotionSoin').disabled = (joueur.potionSoin == 0);
        
    } else {
        document.getElementById('actionCombat').style = 'display: none';
    }
}

function attaqueDeAdversaire(){
    const degatMonstre = joueur.infligerDegat(monstre.attaque);
    console.log(`${monstre.nom} attaque, vous perdez ${degatMonstre} de vie`);
    playerTurn = true;
    refreshInfoCombat();
    gererTour();
}

function checkLevelUp() {

    if (joueur.experience >= 50){
        joueur.niveau += 1;
        joueur.experience -=50;
        joueur.vieMax += 25;
        joueur.vie = joueur.vieMax;
        joueur.attaque += 10;
        if (isMagicien()){
            joueur.manaMax += 20;
            joueur.mana = joueur.manaMax;
        }
        console.log("Vous êtes monté en niveau")
    }

    // monstre + forts ?
}

function isMagicien(){
    return joueur.mana != undefined;
}

function afficherMagasin(isAffichageMagasin){
    if (isAffichageMagasin === true){
        $('#game').hide();
        $('#shop').show();
        affichageInfoShop();
    } else {
        $('#shop').hide();
        $('#game').show();
        refreshInfoCombat();
    }
}

function afficherGameOver(isAffichageGameOver){
    if (isAffichageGameOver === true){
        $('#game').hide();
        $('#gameOver').show();
        affichageInfoShop();
    } else {
        $('#gameOver').hide();
        $('#game').show();
    }
}



function utiliserPotionSoin(){
    if (joueur.potionSoin > 0){
        joueur.potionSoin--;
        const vieRecup = 60*(0.75*joueur.niveau);//pour que la potion reste intéressante, son soin augmente avec le niveau.
        joueur.vie += vieRecup;
        checkVieMax();
        playerTurn = false;
        console.log(`Vous avez récupéré ${vieRecup} points de vie`)
        refreshInfoCombat();
        gererTour();
    } else {
        alert("Vous n'avez pas de potion de soin");
    }
}

function checkVieMax(){
    if (joueur.vie > joueur.vieMax){
        joueur.vie = joueur.vieMax;
    }
}

function acheterPotionSoin(){
    if (joueur.argent >= 20){
        joueur.potionSoin++;
        joueur.argent -= 20;
        affichageInfoShop();
    }else{
        alert("Vous n'avez pas assez d'argent (┬┬﹏┬┬)");
       
        //setTimeout(function(){ $('#argentMessageText').show() }, 2000)
    }
}

function affichageInfoShop(){
    document.getElementById('argentShop').innerHTML = joueur.argent;
}

function quitterJeu() {
    location.reload();
}


// Ajout des Sons 

function couperSon(){
    
}

const audio1 = new Audio("assets/sounds/shot2.wav");
const sonBtnAttaque = document.getElementById("btnAttaque");
sonBtnAttaque.addEventListener("click", () => {
    audio1.play();
});

const audio2 = new Audio("assets/sounds/heal.mp3");
const sonBtnPotionSoin = document.getElementById("utiliserPotionSoin");
sonBtnPotionSoin.addEventListener("click", () => {
    audio2.play();
});

const audio3 = new Audio("assets/sounds/fireBall.mp3");
const sonBtnBoucleDeFeu = document.getElementById("btnBouleDeFeu");
sonBtnBoucleDeFeu.addEventListener("click", () => {
    audio3.play();
});


const audio4 = new Audio("assets/sounds/money.mp3");
const sonAllerMagasin = document.getElementById("allerAuMagasin");
sonAllerMagasin.addEventListener("click", () => {
    audio4.play();
});

monstreCont += monstre.nom
console.log(monstreCont[0][0])