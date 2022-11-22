// import {personnage} from './personnage.js';

// export 
class Hero extends Personnage {
    constructor(nom, vie, attaque, defense, experience, niveau, argent, potionSoin, type){
        super(nom, vie, attaque, defense, niveau);

        this.experience = experience;
        this.argent = argent;
        this.potionSoin = potionSoin;
        this.type = type;
    }

    getExperience() {
        return this.experience;
    }
    getArgent(){
        return this.argent;
    }
    getPotionSoin(){
        return this.potionSoin;
    }
}