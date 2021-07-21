new Vue({
    el:'#app',
    data: {
        running: false,
        playerLife: 100,
        monsterLife: 100,
        logs: []
    },
    computed: {
        hasResult(){
            return this.playerLife == 0 || this.monsterLife == 0
        },
        
    },
    methods: {
        starGame(){
            this.running = true
            this.playerLife= 100
            this.monsterLife= 100
            this.logs = []
        },
        attack(especial){
            this.hurt('monsterLife', 5, 10 , especial ,'jogador', 'Monstro' , 'player')
            if(this.monsterLife > 0){
                this.hurt('playerLife', 7, 12 , false , 'Monstro', 'Jogador' , 'monster')
            }
            
            
        },
        hurt(prop, min, max , especial, source , target, cls){
            const plus = especial ? 5 : 0    // plus para calcular se for especial ter mais força
            const hurt = this.getRandom(min + plus, max + plus)
            this[prop] = Math.max(this[prop] - hurt, 0) // max para nao deixar ser menor que zero
            // this[playerLife] ou this[monsterLife] para tirar vida dos dois dinamicamente

            this.registerLog(`${source} atingiu ${target} com ${hurt}.`, cls)
        },
        heal(min , max){
            const heal = this.getRandom(min,max)
            this.playerLife = Math.min(this.playerLife + heal , 100) // pra nao deixa o player com mais de 100 apos curar
            this.registerLog(`Jogador ganhou força de ${heal}.`, 'player')
        },
        healAndHurt(){
            this.heal(10,15)
            this.hurt('playerLife', 7 , 12 , false , 'Monstro', 'Jogador' , 'monster')
        },
        getRandom(min, max){
            const value = Math.random() *(max-min) +min
            return Math.round(value)  //round para arredondar
        },
        registerLog(text , cls){
           this.logs.unshift({ text , cls })  // sempre o primeiro log em cima e os mais antigos embaixo

        }
    },
    watch: {
        hasResult(value){
            if(value) this.running = false
        }
    }
})