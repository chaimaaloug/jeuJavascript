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

let joueur;
let pseudo;

let monstre;

let playerTurn = true;

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
        refreshInfo();

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
    document.getElementById('vie').innerHTML = joueur.vie + "/" + joueur.vieMax;
    document.getElementById('attaque').innerHTML = joueur.attaque;
    document.getElementById('defense').innerHTML = joueur.defense;
    document.getElementById('experience').innerHTML = joueur.experience;
    document.getElementById('niveau').innerHTML = joueur.niveau;
    document.getElementById("imgJoueur").src = joueur.img;
    affichageTexteBarre("barreVieJoueur", "Vie :" + joueur.vie + "/" + joueur.vieMax, joueur.vie/joueur.vieMax);

    // test magicien
    if(isMagicien()){
        document.getElementById('barreManaJoueur').style = 'display: block;';
        document.getElementById('manaP').style = 'display: block;';
        document.getElementById('mana').innerHTML = joueur.mana + "/" + joueur.manaMax;
        document.getElementById('btnBouleDeFeu').style = 'display: inline-block';
        affichageTexteBarre("barreManaJoueur", joueur.mana + "/" + joueur.manaMax,joueur.mana/joueur.manaMax);
    } 
    // test guerrier
    else {
        document.getElementById('barreManaJoueur').style = 'display: none';
        document.getElementById('manaP').style = 'display: none';
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
            monstre = new Monstre("Racaillou", 60, 15, 30, 20, "./assets/racaillou.png");
            break;
        case 2:
            monstre = new Monstre("Enderman", 100, 40, 20, 50, "./assets/enderman.png");
            break;
        default:
            monstre = new Gobelin("Guluk", 50);
    }
    console.log(monstre);
    affichageInfoMonstre();
}

function attaque(){
    monstre.vie -= joueur.attaque;
    refreshInfo();
}

function verifMort(){
    if(monstre.vie <= 0){
        monstre.vie = 0;
        joueur.experience += monstre.experienceDonnee;
        alert("Vous avez tué " + monstre.nom);
        checkLevelUp();
        genererMonstre();
    }
    if(joueur.vie <= 0){
        joueur.vie = 0;
        alert("Vous êtes mort");
        location.reload();
    }
}

function bouleDeFeu(){
    joueur.bouleDeFeu(monstre);
    refreshInfo();   
}

function refreshInfo(){
    affichageInfoMonstre();
    verifMort();
    affichageInfoJoueur();
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
    const degatMonstre = monstre.attaque - joueur.defense
    joueur.vie -= degatMonstre;
    alert(`${monstre.nom} attaque, vous perdez ${degatMonstre} de vie`);
    playerTurn = true;
    refreshInfo();
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
        alert("Vous êtes monté en niveau")
    }
    // augmenter bouleDeFeu (lier attaque ?)
    // monstre + forts ?
}

function isMagicien(){
    return joueur.mana != undefined;
}

//document.getElementById("imgJoueur").setAttribute("src", "../assets/firemage.png")
// document.getElementById("imgJoueur").src = "./assets/firemage.png";
// document.getElementById("imgJoueur").setAttribute("width", "250px");

// let imgJoueur = $("#imgJoueur").attr("src", "../assets/firemage.png").attr("width", "250px").attr("height", "auto").attr("alt", "Mage de feu");
// let imgMonstre = $("#imgMonstre").attr("src", "../assets/" + monstre + ".png").attr("width", "250px").attr("height", "auto").attr("alt", "Gobelin");

