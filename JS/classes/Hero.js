// import {personnage} from './personnage.js';

// export 
class Hero extends Personnage {
    constructor(nom, vie, attaque, defense, experience){
        super(nom, vie, attaque, defense);

        this.experience = experience;
    }

    getExperience() {
        return this.experience;
    }
}