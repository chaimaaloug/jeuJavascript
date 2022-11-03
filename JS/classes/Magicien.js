// import {hero} from './hero.js';

// export 
class Magicien extends Hero {
    constructor(nom, experience, vie = 100, attaque = 20, defense = 10, mana = 100, niveau = 1){
        super(nom, vie, attaque, defense, experience, niveau);
        this.mana = mana;
        this.manaMax = mana;
    }

    // création boule de feu pour les dommages magiques
    bouleDeFeu(cible){
        
        if (this.mana >= 20) {
            this.mana -= 20;
            cible.vie -= (joueur.attaque*2);
            console.log(this.nom + " attaque " + cible.nom + " avec une boule de feu");
        }else{
            alert("pas de mana");
        }
    }
}