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

        affichageInfoPerso();
        genererMonstre();

    }else{
        alert("Choissez un pseudo");
    }
}

function affichageInfoPerso(){
    document.getElementById('nom').innerHTML = perso.nom;
    document.getElementById('vie').innerHTML = perso.vie;
    document.getElementById('attaque').innerHTML = perso.attaque;
    document.getElementById('defense').innerHTML = perso.defense;
    document.getElementById('experience').innerHTML = perso.experience;

    // test magicien
    if(perso.mana != undefined){
        document.getElementById('manaP').style = 'display: block;';
        document.getElementById('mana').innerHTML = perso.mana;
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
    document.getElementById('vieMonstre').innerHTML = monstre.vie;
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
        monstre.vie == 0;
        perso.experience += monstre.experienceDonnee;
        alert("Vous avez tué " + monstre.nom);
        genererMonstre();
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
}