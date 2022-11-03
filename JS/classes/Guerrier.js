// import {hero} from './hero.js';

// export 
class Guerrier extends Hero {
    constructor(nom, experience, vie = 150, attaque = 40, defense = 20, niveau = 1){
        super(nom, vie, attaque, defense, experience, niveau);
    }

    // avantage d'être un guerrier : la force !
    // penser à ajouter une barre de rage pour égalité avec magicien
    coupBrutal() {
        return this.attaque + 20;
    }
}