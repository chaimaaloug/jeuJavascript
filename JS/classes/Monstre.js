// import {personnage} from './personnage.js';

// export 
class Monstre extends Personnage {
    constructor(nom, vie, attaque, defense, experienceDonnee){
        super(nom, vie, attaque, defense);

        this.experienceDonnee = experienceDonnee;
    }

    getExperienceDonnee() {
        return this.experienceDonnee;
    }
}