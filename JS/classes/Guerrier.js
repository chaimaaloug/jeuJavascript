// import {hero} from './hero.js';

// export 
class Guerrier extends Hero {
    constructor(nom, experience, vie = 150, attaque = 40, defense = 20, rage = 0, niveau = 1, argent = 0, potionSoin = 0, type = "guerrier"){
        super(nom, vie, attaque, defense, experience, niveau, argent, potionSoin, type);
        this.rage = rage;
        this.rageMax = 100;
        this.img = "./assets/guerrier.png";
    }

    // avantage d'être un guerrier : la force !
    // penser à ajouter une barre de rage pour égalité avec magicien
    coupBrutal() {
        return this.attaque + 20;
    }
}