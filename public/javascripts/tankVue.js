// Vue components
Vue.component('player-name', {
    template:`
    <div class="input-group mb-3 input-name">
        <div id="data_player1">
            <input v-model="player_data.player1" id="player1_name" type="text" class="form-control" placeholder="SPIELER 1">
        </div>
        <div id="data_player2">
            <input v-model="player_data.player2" id="player2_name" type="text" class="form-control" placeholder="SPIELER 2">
        </div>
        <div id="test">
            <p>Name: {{ player_data.player1 }}</p>
            <p>Name: {{ player_data.player2 }}</p>
        </div>
    </div>
    `,
    data() {
        return {
            player_data: {
                player1: "",
                player2: ""
            }
        }
    }
});

Vue.component('game', {
    template:`
    <button v-on:click="tankGame()">Start</button>
    `,
    data : {
        canvas: null
    },
    mounted() {
        let c = $('#mycanvas')[0].getContext('2d');
        this.canvas = c;
        this.ctx1 = this.canvas;
    },
    methods: {
        tankGame: function () {
            setInterval(() => {
                this.drawGame(game.mapfirstx[0], game.mapfirsty[0], game.maplastx, game.maplasty)
            }, 1);
        },
        drawGame: function (X1, Y1, X2, Y2) {
            this.ctx1.clearRect(0,0,1100,600);
            this.ctx1.drawImage(img, tank_player1.x - tank_player1.dx, tank_player1.y - tank_player1.dy);
            this.flip(img);
            this.drawing(X1, Y1, X2, Y2);
        },
        flip(img) {
            this.ctx1.translate(tank_player2.x-tank_player2.dx, tank_player2.y-tank_player2.dy);
            this.ctx1.scale(-1, 1);
            this.ctx1.drawImage(img, 0, 0);
            this.ctx1.setTransform(1,0,0,1,0,0);
        },
        drawing(X1, Y1, X2, Y2) {
            this.ctx1.beginPath();
            this.ctx1.moveTo(X1, Y1);
            this.ctx1.lineTo(X2, Y2);
            this.ctx1.stroke();
        }
    }
})

$(document).ready(function() {
    new Vue({
        el: '#vue',
    });
    new Vue({
        el: '#gameMap'
    });
});
