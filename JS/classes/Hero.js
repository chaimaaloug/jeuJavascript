// import {personnage} from './personnage.js';

// export 
class Hero extends Personnage {
    constructor(nom, vie, attaque, defense, experience, niveau){
        super(nom, vie, attaque, defense, niveau);

        this.experience = experience;
    }

    getExperience() {
        return this.experience;
    }
}