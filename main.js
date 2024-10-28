class Heroi {
    constructor(nome= "Randon", xp= 0, ataque=3, vida=100) {
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
                
        console.log("---------------------")
        console.log("| Heroi: " + this.nome)
        console.log("| XP: " + this.xp)
        console.log("| Nivel: " + this.nivel)
        console.log("| Rank: " + rank)
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
    incrementaXp(xp){
        this.xp += xp
    }
    decrementaXp(xp){
        this.xp -= xp
    }
    
    setVida(vida){
        this.vida = vida
    }
    
    setVitoria(valor){
        this.qtd_vitorias = valor
    }

    setDerrota(valor){
        this.qtd_derrotas = valor
    }

    incrementaVitoria(){
        this.qtd_vitorias += 1
    }

    incrementaDerrota(){
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
        else if (saldo > 10 && saldo <= 20){ return "Bronze"}
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
        this.rodadas = rodadas*100
        // Ganho XP
        this.xp_ataque = 0
        this.xp_esquiva = 0
        this.xp_vitoria = 4
        this.xp_derrota = 2
        // herois
        this.heroi1 = null
        this.heroi2 = null
    }
    

    iniciarBatalha(){
        // inicio da batalha
        console.log("Inicio da batalha")

        for(let i = 0; i < this.rodadas; i++){
            this.todosContraTodos()
        }
        this.exibirFimBatalha()
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
                        this.heroi1.setVida(this.heroi1.vida_padrao)
                        this.heroi2.setVida(this.heroi2.vida_padrao)
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
                    this.heroi2.incrementaXp(this.xp_esquiva)
                }else{
                    this.heroi2.setVida(this.heroi2.getVida() - this.heroi1.getAtaque())  
                    this.heroi1.incrementaXp(this.xp_ataque)
                }
            }else{
                esquivou = this.verificaEsquivou()
                if(esquivou === true){ // h1 esquivou
                    this.heroi1.incrementaXp(this.xp_esquiva)
                }else{
                    this.heroi1.setVida(this.heroi1.getVida() - this.heroi2.getAtaque()) 
                    this.heroi2.incrementaXp(this.xp_ataque)
                }
            }
            if(this.verificaMorteGanhador()){
                break
            }
        }
    }

    verificaMorteGanhador(){ //falta
        if(this.heroi1.getVida() <= 0){
            this.heroi1.incrementaDerrota()
            this.heroi1.decrementaXp(this.xp_derrota)
            
            this.heroi2.incrementaVitoria()
            this.heroi2.incrementaXp(this.xp_vitoria)
            return true
        }else if (this.heroi2.getVida() <= 0){
            this.heroi2.incrementaDerrota()
            this.heroi2.decrementaXp(this.xp_derrota)
            
            this.heroi1.incrementaVitoria()
            this.heroi1.incrementaXp(this.xp_vitoria)
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
        for(let i = 0; i < this.herois.length ; i++){
            this.herois[i].exibirInfo()
        }
    }
}



ruan = new Heroi("Ruan")
pablo = new Heroi("Pablo")
sousa = new Heroi("Sousa")
estacio = new Heroi("Estacio")
teste = new Heroi("Teste")

herois = [ruan, pablo, sousa, estacio, teste]

batalha = new Battle(3, herois)
batalha.iniciarBatalha()