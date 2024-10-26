class Heroi {
    constructor(nome= "Randon", xp= 1000, ataque=30, vida=1000) {
        this.nome = nome // sera imutavel
        this.xp = xp
        this.nivel = null
        this.ataque = ataque
        this.vida_padrao = vida // para o inicio de cada batalha
        this.vida = vida
        this.qtd_vitorias = 0
        this.qtd_derrotas = 0
    }
// gets
    exibirInfo(){
        this.nivel = this.verificaNivel()
        let rank = this.verificaRank()
        
        console.log('O Herói de nome ' + this.nome + ' está no nível ' + this.nivel)
        
        console.log("---------------------")
        console.log("| Heroi: " + this.nome)
        console.log("| XP: " + this.xp)
        console.log("| Nivel: " + this.nivel)
        console.log("| Rank " + rank)
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
    
    setVitoria(){
        this.qtd_vitorias += 1
    }

    setDerrota(){
        this.qtd_derrotas += 1
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
    verificaRank(){
        let saldo = this.qtd_vitorias - this.qtd_derrotas 

        if (saldo <= 10){ return "Ferro"}
        else if (saldo > 10 && saldo <= 10){ return "Bronze"}
        else if (saldo > 20 && saldo <= 50){ return "Prata"}
        else if (saldo > 50 && saldo <= 80){ return "Ouro"}
        else if (saldo > 80 && saldo <= 90){ return "Diamante"}
        else if (saldo > 90 && saldo <= 100){ return "Lendario"}
        else if (saldo > 100){ return "Imortal"}
        
    }
}

class Battle{
    constructor(rodadas, herois=[]){
        this.herois = herois // lista de herois
        this.rodadas = rodadas*1000
        // Ganho XP
        this.xp_ataque = 10
        this.xp_esquiva = 5
        this.xp_vitoria = 50
        this.xp_derrota = 30
        // herois
        this.heroi1 = null
        this.heroi2 = null
    }
    
    // escholherBatalhadores(){ 
    //     let indiceAleatorio = Math.floor(Math.random() * this.herois.length);
    //     this.heroi1 = this.herois[indiceAleatorio]
        
    //     indiceAleatorio = Math.floor(Math.random() * this.herois.length);
    //     this.heroi2 = this.herois[indiceAleatorio]

        
    // }

    iniciarBatalha(){
        // inicio da batalha
        console.log("Inicio da batalha")
        this.heroi1.exibirInfo()
        this.heroi2.exibirInfo()
    }
    
    verificaEsquivou(){       // CHANCE DE ESQUIVA  
        let chance_esquiva = Math.random()
        if(chance_esquiva >= 0.3){ // esquivou
            return true
        }else{
            return false
        }
    }
    

    // todos os batalhadores vão batalhar pelo menos 2 vezes com o mesmo heroi (revanche)
    todosContraTodos(){
        for(let h1 = 0; h1<this.herois.length; h1++){
            this.heroi1 = this.herois[h1] 
                for(let h2 = 0; h2<this.herois.length; h2++){
                    if (h2 != h1){   // não pode lutar contra si propio
                        this.heroi2 = this.herois[h2]
                        this.heroi1.setVida()
                        this.lutar() 
                    }
            }    
        }
    }

    lutar(){  // porradaria
        let chance_ataque_1_2 = 0
        let esquivou = false


        for (let cont = 0; cont < this.rodadas; cont++){
            chance_ataque_1_2 = Math.random()
            if (chance_ataque_1_2 > 0.5){
                esquivou = this.verificaEsquivou()
                
                if(esquivou === true){ // h2 esquivou
                    this.heroi2.setXp(this.heroi2.getXp() + this.xp_esquiva)
                }else{
                    this.heroi2.setVida(this.heroi2.getVida() - this.heroi1.getAtaque())  
                    this.heroi1.setXp(this.heroi1.getXp() + this.xp_ataque)
                }
            }else{
                esquivou = this.verificaEsquivou()
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

    verificaMorteGanhador(){
        if(this.heroi1.getVida() <= 0){
            this.heroi1
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