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

$(document).ready(function() {
    var tankmenu = new Vue({
        el: '#vue'
    });
});

