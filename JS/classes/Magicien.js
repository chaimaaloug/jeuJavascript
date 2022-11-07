// import {hero} from './hero.js';

// export 
class Magicien extends Hero {
    constructor(nom, experience, vie = 100, attaque = 20, defense = 10, mana = 100, niveau = 1, argent = 0, potionSoin = 0){
        super(nom, vie, attaque, defense, experience, niveau, argent, potionSoin);
        this.mana = mana;
        this.manaMax = mana;
        this.img = "./assets/firemage.png";
    }

    // création boule de feu pour les dommages magiques
    bouleDeFeu(cible){
        
        if (this.mana >= 20) {
            this.mana -= 20;
            cible.infligerDegat(60 * (this.niveau*0.75)); //60 = dégat magique
            console.log(this.nom + " attaque " + cible.nom + " avec une boule de feu");
            return true;
        }else{
            alert("pas de mana");
            return false;
        }
    }
}