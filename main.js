class Heroi {
    constructor(nome= "Randon", xp= 1000, ataque=30, vida=1000) {
        this.nome = nome // sera imutavel
        this.xp = xp
        this.nivel = null
        this.ataque = ataque
        this.vida = vida
    }
// gets
    exibirInfo(){
        this.nivel = this.verificaNivel()
        
        console.log('O Herói de nome ' + this.nome + ' está no nível ' + this.nivel)
        
        console.log("---------------------")
        console.log("| Heroi: " + this.nome)
        console.log("| XP: " + this.xp)
        console.log("| Nivel: " + this.nivel)
        console.log("| Vida: " + this.vida)
        console.log("| Ataque: " + this.ataque)
        console.log("---------------------")
    }
    getNome(){
        return this.nome
    }
    
    getXp(){
        return this.xp
    }
    
    getAtaque(){
        return this.ataque
    }
    
    getVida(){
        return this.vida
    }
    // sets
    setXp(xp){
        this.xp = xp
    }
    
    
    setVida(vida){
        this.vida = vida
    }

    verificaNivel(){ 

        if (this.xp <= 1000){
            return "Ferro"
        } else if (this.xp > 1000 && this.xp <= 2000) {
            return "Bronze"
        } else if (this.xp > 2000 && this.xp <= 5000) {
            return "Prata"
        } else if (this.xp > 5000 && this.xp <= 7000) {
            return "Ouro"
        } else if (this.xp > 7000 && this.xp <= 8000) {
            return "Platina"
        } else if (this.xp > 8000 && this.xp <= 9000) {
            return "Ascendente"
        } else if (this.xp > 9000 && this.xp <= 10000) {
            return "Imortal"
        } else if (this.xp > 10000) {
            return "Radiante"
        }
    }
}

class Battle{
    constructor(rodadas, h1, h2){
        this.heroi1 = h1
        this.heroi2 = h2
        this.rodadas = rodadas*1000
        // Ganho XP
        this.xp_ataque = 100
        this.xp_esquiva = 50
        // inicio da batalha
        console.log("Inicio da batalha")
        this.heroi1.exibirInfo()
        this.heroi2.exibirInfo()
    }
    
    verificaEsquivou(){
        let chance_esquiva = Math.random()
        if(chance_esquiva >= 0.3){ // esquivou
            return true
        }else{
            return false
        }
    }
    
    battle(){
        let chance_ataque_1_2 = 0
        let esquivou = false
        for (let cont = 0; cont<this.rodadas;cont++){
            chance_ataque_1_2 = Math.random()
            if (chance_ataque_1_2 > 0.5){
                esquivou = this.verificaEsquivou(this.heroi1, this.heroi2)
                
                if(esquivou === true){ // h2 esquivou
                    this.heroi2.setXp(this.heroi2.getXp() + this.xp_esquiva)
                }else{
                    this.heroi2.setVida(this.heroi2.getVida() - this.heroi1.getAtaque())  
                    this.heroi1.setXp(this.heroi1.getXp() + this.xp_ataque)
                }
            }else{
                esquivou = this.verificaEsquivou(this.heroi2,this.heroi1)
                if(esquivou === true){ // h1 esquivou
                    this.heroi1.setXp(this.heroi1.getXp() + this.xp_esquiva)
                }else{
                    this.heroi1.setVida(this.heroi1.getVida() - this.heroi2.getAtaque()) 
                    this.heroi2.setXp(this.heroi2.getXp() + this.xp_ataque)
                }
            }
            if(this.verificaMorte()){
                break
            }
        }
        this.exibirFimBatalha()
    }

    verificaMorte(){
        if(this.heroi1.getVida() < 0 || this.heroi2.getVida() < 0){
            console.log("Fim da batalha")
            return true
        }else{
            return false
        }
    }

    verificarGanhador(){
        if(this.heroi1.getVida() > this.heroi2.getXp()){
            return 1
        }else{
            return 2
        }
    }
    
    exibirFimBatalha(){
        console.log("Apresentando os Herois\n")
        this.heroi1.exibirInfo()
        this.heroi2.exibirInfo()
        
        let ganhador = this.verificarGanhador() === 1 ? this.heroi1.getNome() : this.heroi2.getNome() 
        // console.log(ganhador)
        console.log( ganhador + " eh o ganhador da batalha!!!")
    }
}



ruan = new Heroi("Ruan")
pablo = new Heroi("Pablo")

batalha = new Battle(5, ruan, pablo)
batalha.battle()