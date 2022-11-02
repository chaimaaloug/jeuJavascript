// export 
class Personnage {

// tous les personnages ont ces caratérisques : les monstres, les héros et les méchants.

    constructor(nom, vie, attaque, defense, niveau) {
        this.nom = nom;
        this.vie = vie;
        this.vieMax = vie;
        this.attaque = attaque;
        this.defense = defense;    
        this.niveau = niveau;    
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
    getVieMax() {
        return this.vieMax;
    }
    getNiveau() {
        return this.niveau;
    }

}