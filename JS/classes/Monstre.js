// import {personnage} from './personnage.js';

// export 
class Monstre extends Personnage {
    constructor(nom, vie, attaque, defense, experienceDonnee, img, argentDonne){
        super(nom, vie, attaque, defense);

        this.experienceDonnee = experienceDonnee;
        this.img = img;
        this.argentDonne = argentDonne
    }

    getExperienceDonnee() {
        return this.experienceDonnee;
    }
    getArgentDonne(){
        return this.argentDonne;
    }
}