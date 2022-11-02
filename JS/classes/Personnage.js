// export 
class Personnage {

// tous les personnages ont ces caratérisques : les monstres, les héros et les méchants.

    constructor(nom, vie, attaque, defense) {
        this.nom = nom;
        this.vie = vie;
        this.attaque = attaque;
        this.defense = defense;    
    }

    getNom() {
        return this.nom;
    }
    getVie() {
        return this.vie;
    }
    getAttaque() {
        return this.attaque;
    }
    getDefense() {
        return this.defense;
    }

}