$(document).ready(function () {
    var tankGame = new Vue({
        el:'#tankGame'
    })
})

Vue.component('tank-game', {
    template:`
        <div class="map">
        <canvas id="canvas" width="1100" height="600"></canvas>
        </div>
    `,
});

Vue.component('tank-button', {
    template:`
        <div class="col-9 gameplay_buttons">
         <button type="sumbit" onclick="moveLeft()" >Left</button>
         <button type="sumbit" onclick="moveRight()" >Right</button>
        </div>
    `,
});

Vue.component('tank-player', {
    template:`
        <div id="player1">
                    <!-- wird durch tank.js gefüllt -->
        </div>
        <div id="player2">
                    <!-- wird durch tank.js gefüllt -->
        </div>
    `,
});

Vue.component('tank-title', {
    template:`
        <h1>
             Tank
        </h1>
    `,
});

Vue.component('tank-title', {
    template:`
        <form action="" method="get">
            <div class="row">
                <div class="input-group mb-3 input-name">
                    <form id="data_player1">
                        <input id="player1_name" type="text" class="form-control" placeholder="SPIELER 1">
                    </form>
                    <form id="data_player2">
                        <input id="player2_name" type="text" class="form-control" placeholder="SPIELER 2">
                    </form>
                </div>

                <div class="col-md-2 dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="map"
                        id="dropdownMenuButton" data-toggle="dropdown">
                         Map
                    </button>
                    <ul class="dropdown-menu" role="menu" id="mapvalue" aria-labelledby="dropdownMenuButton">
                        <li>Wolfsschanze</li>
                        <li>Gerade</li>
                        <li>Sägezahnhügel</li>
                    </ul>
                </div>
            </div>
        </form>
    `,
});


