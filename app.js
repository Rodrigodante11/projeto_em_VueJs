new Vue({
    el:'#app',
    data: {
        running: false,
        playerLife: 100,
        monsterLife: 100,
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
        },
        attack(especial){
            this.hurt('playerLife', 7, 12 , false)
            this.hurt('monsterLife', 5, 10 , especial)
        },
        hurt(prop, min,max , especial){
            const plus = especial ? 5 : 0    // plus para calcular se for especial ter mais força
            const hurt = this.getRandom(min + plus, max + plus)
            this[prop] = Math.max(this[prop] - hurt, 0) // max para nao deixar ser menor que zero
            // this[playerLife] ou this[monsterLife] para tirar vida dos dois dina,icamente
        },
        healAndHurt(){
            this.heal(10,15)
            this.hurt('playerLife', 7 , 12 , false)
        },
        heal(min , max){
            const heal = this.getRandom(min,max)
            this.playerLife = Math.min(this.playerLife + heal , 100) // pra nao deixa o player com mais de 100 apos curar
        },
        getRandom(min, max){
            const value = Math.random() *(max-min) +min
            return Math.round(value)  //round para arredondar
        }
    },
    watch: {
        hasResult(value){
            if(value) this.running = false
        }
    }
})