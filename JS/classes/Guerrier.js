// import {hero} from './hero.js';

// export 
class Guerrier extends Hero {
    constructor(nom, experience, vie = 150, attaque = 40, defense = 20, rage = 0, niveau = 1, argent = 0, potionSoin = 0, type = "guerrier"){
        super(nom, vie, attaque, defense, experience, niveau, argent, potionSoin, type);
        this.rage = rage;
        this.rageMax = 100;
        this.img = "./assets/guerrier.png";
        
        // variable pour la compétence "enrager"
        this.attaqueGagnee = 0;
        this.nbTourRageRestant = 3;
        this.isEnrage = false;
    }

    // avantage d'être un guerrier : la force !
    // penser à ajouter une barre de rage pour égalité avec magicien
    // coupBrutal() {
    //     return this.attaque + 20;
    // }

    infligerDegat(nbDegat){
        this.rage += 20;
        if(this.rage >= this.rageMax){
            this.rage = this.rageMax;
        }
        super.infligerDegat(nbDegat);
    }

    
    enrager(){
        this.attaqueGagnee = (15 + ( 5 * this.niveau));
        // augmente dégat et réduit défense pendant 3 tours
        this.attaque += this.attaqueGagnee;
        this.defense -= 10;
        this.rage -= 40;
        this.isEnrage = true;
    }

    desenrager(){
        this.attaque -= this.attaqueGagnee;
        this.defense += 10;
        this.isEnrage = false;
        this.nbTourRageRestant = 3;
    }
}