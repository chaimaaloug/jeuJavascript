// import {personnage} from './personnage.js';

// export 
class Monstre extends Personnage {
    constructor(nom, vie, attaque, defense, experienceDonnee, img){
        super(nom, vie, attaque, defense);

        this.experienceDonnee = experienceDonnee;
        this.img = img;
    }

    getExperienceDonnee() {
        return this.experienceDonnee;
    }
}