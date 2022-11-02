// import guerrier from './classes/guerrier.js';
// import magicien from './classes/magicien.js';
// import monstre from './classes/monstre.js';

const bob = new Guerrier("Bob", 0);
const valentin = new Magicien("Valou", 0); // il a une attaque boule de feu qui inflige 60 dommages magiques

const gobelinGuluk = new Gobelin("Guluk", 50); // possibilité de faire une classe gobelin pour lui donner de nouvelles propriétés, exemple gobelin archer.
const racaillou = new Monstre("Racaillou", 60, 15, 30, 20); // défenseur
const enderman = new Monstre("Enderman", 100, 40, 20, 50); // c'est un mini boss


// valentin.bouleDeFeu(gobelinGuluk);
// valentin.bouleDeFeu(gobelinGuluk);
// valentin.bouleDeFeu(gobelinGuluk);
// valentin.bouleDeFeu(gobelinGuluk);
// valentin.bouleDeFeu(gobelinGuluk);
// valentin.bouleDeFeu(gobelinGuluk);
// console.log("Vie de " + gobelinGuluk.nom + ": " + gobelinGuluk.vie);
// console.log("Il te reste " + valentin.mana + " points de mana");

var perso;
var pseudo;

var monstre;

var playerTurn = true;

// initialisation 
function choixPerso(type) {
    console.log(type);
    pseudo = document.getElementById("InputName").value;

    if (pseudo != ""){

        if(type === "Magicien"){
            perso = new Magicien(pseudo, 0);
        }else if(type === "Guerrier"){
            perso = new Guerrier(pseudo, 0);
        }
        
        console.log(pseudo);

        $('#starter').hide();
        $('#game').show();

        genererMonstre();
        refreshInfo();

    }else{
        alert("Choissez un pseudo");
    }
}

function affichageInfoPerso(){
    document.getElementById('nom').innerHTML = perso.nom;
    document.getElementById('vie').innerHTML = perso.vie + "/" + perso.vieMax;
    document.getElementById('attaque').innerHTML = perso.attaque;
    document.getElementById('defense').innerHTML = perso.defense;
    document.getElementById('experience').innerHTML = perso.experience;
    document.getElementById('niveau').innerHTML = perso.niveau;

    // test magicien
    if(isMagicien()){
        document.getElementById('manaP').style = 'display: block;';
        document.getElementById('mana').innerHTML = perso.mana + "/" + perso.manaMax;;
        document.getElementById('btnBouleDeFeu').style = 'display: inline-block';
    } 
    // test guerrier
    else {
        document.getElementById('manaP').style = 'display: none';
        document.getElementById('btnBouleDeFeu').style = 'display: none';
    }
}

function affichageInfoMonstre(){
    document.getElementById('nomMonstre').innerHTML = monstre.nom;
    document.getElementById('vieMonstre').innerHTML = monstre.vie + "/" + monstre.vieMax;
    document.getElementById('attaqueMonstre').innerHTML = monstre.attaque;
    document.getElementById('defenseMonstre').innerHTML = monstre.defense;
}

function genererMonstre(){
    switch(Math.floor(Math.random() * 3)){
        case 0:
            monstre = new Gobelin("Guluk", 50);
            break;
        case 1:
            monstre = new Monstre("Racaillou", 60, 15, 30, 20);
            break;
        case 2:
            monstre = new Monstre("Enderman", 100, 40, 20, 50);
            break;
        default:
            monstre = new Gobelin("Guluk", 50);
    }
    console.log(monstre);
    affichageInfoMonstre();
}

function attaque(){
    monstre.vie -= perso.attaque;
    refreshInfo();
}

function verifMort(){
    if(monstre.vie <= 0){
        monstre.vie = 0;
        perso.experience += monstre.experienceDonnee;
        alert("Vous avez tué " + monstre.nom);
        checkLevelUp();
        genererMonstre();
    }
    if(perso.vie <= 0){
        perso.vie = 0;
        alert("Vous êtes mort");
        location.reload();
    }
}

function bouleDeFeu(){
    perso.bouleDeFeu(monstre);
    refreshInfo();   
}

function refreshInfo(){
    affichageInfoMonstre();
    verifMort();
    affichageInfoPerso();
    gererTour();
}

function gererTour(){
    console.log(playerTurn);
    affichageActionJoueur();
    if (playerTurn) {
        playerTurn = false;
    } else {
        attaqueDeAdversaire();
    }
}

function affichageActionJoueur(){
    if (playerTurn){
        document.getElementById('actionJoueur').style = 'display: block';
    } else {
        document.getElementById('actionJoueur').style = 'display: none';
    }
}

function attaqueDeAdversaire(){
    const degatMonstre = monstre.attaque - perso.defense
    perso.vie -= degatMonstre;
    alert(`${monstre.nom} attaque, vous perdez ${degatMonstre} de vie`);
    playerTurn = true;
    refreshInfo();
}

function checkLevelUp() {

    if (perso.experience >= 50){
        perso.niveau += 1;
        perso.experience -=50;
        perso.vieMax += 25;
        perso.vie = perso.vieMax;
        perso.attaque += 10;
        if (isMagicien()){
            perso.manaMax += 20;
            perso.mana = perso.manaMax;
        }
        alert("Vous êtes monté en niveau")
    }
    // augmenter bouleDeFeu (lié attaque ?)
    // monstre + forts
}

function isMagicien(){
    return perso.mana != undefined;
}