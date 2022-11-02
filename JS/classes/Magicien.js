// import {hero} from './hero.js';

// export 
class Magicien extends Hero {
    constructor(nom, experience, vie = 100, attaque = 20, defense = 10, mana = 100){
        super(nom, vie, attaque, defense, experience);
        this.mana = mana;
    }

    // création boule de feu pour les dommages magiques
    bouleDeFeu(cible){
        
        if (this.mana >= 20) {
            this.mana -= 20;
            cible.vie -= 60;
            console.log(this.nom + " attaque " + cible.nom + " avec une boule de feu");
        }else{
            alert("pas de mana");
        }
    }
}