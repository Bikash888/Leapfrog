function carGame() {
    this.DIV_WIDTH = 300;
    this.DIV_HEIGHT = 700;
    this.CAR_WIDTH = 60;
    this.CAR_HEIGHT = 100;
    this.myCarPositionX = this.DIV_HEIGHT - this.CAR_HEIGHT;
    this.myCarPositionY = 200;
    this.element;
    this.car;
    this.x = 0;
    this.y = 0;
    this.carX = 0;
    this.carY = 0;
    var racing = document.querySelector('.app');
    var player = {
        speed: 8,
        scor: 0

    };
    this.init = function() {
        this.generateRoad();
        moveRoad();
        this.setCarPosition();
        playGame();
        this.scoreCard();
        document.addEventListener('keydown', this.moveCar.bind(this));

    }
    this.moveCar = function(e) {
        if (e.keyCode == 39) {
            console.log(this.x);
            if (this.x <= 180) {
                this.x += 100;
                this.car.style.left = this.x + 'px';
            }
        }
        if (e.keyCode == 37) {
            if (this.x >= 100) {
                this.x -= 100;
                this.car.style.left = this.x + 'px';
            }
        }



    }

    this.scoreCard = function() {
        var scoreDiv = document.createElement('div');
        scoreDiv.classList.add('scoreDiv');
        scoreDiv.innerHTML = '<h2>SocreCard</h2>';
        racing.appendChild(scoreDiv);
    }
    this.setCarPosition = function() {
        this.y = (this.DIV_HEIGHT - this.CAR_HEIGHT);
        this.x = (this.DIV_WIDTH) / 2;
        this.car.style.top = this.y + 'px';
        this.car.style.left = this.x + 'px';
    }
    this.generateRoad = function() {
        racing.innerHTML = '';
        for (let i = 0; i < 10; i++) {
            let div = document.createElement("div");
            div.classList.add("line");
            div.y = i * 100;

            div.style.top = i * 150 + "px";
            racing.appendChild(div);
        }
        window.requestAnimationFrame(playGame);
        var car = document.createElement('div');
        car.classList.add('car');
        racing.appendChild(car);
        this.car = car;

        for (let i = 0; i < 1; i++) {
            let enemy = document.createElement("div");
            enemy.classList.add("enemy");
            // enemy.innerHTML = (i + 1);
            enemy.y = ((i + 1) * 100) * -1;
            console.log(enemy.y);
            enemy.style.top = enemy.y + "px";
            enemy.style.left = getRandom(0, 180) + 120 + "px";
            racing.appendChild(enemy);
        }
    }
    var randomColor = function() {
        var hue = 'rgb(' + (Math.floor(Math.random() * 256)) +
            ',' +
            (Math.floor(Math.random() * 256)) +
            ',' + (Math.floor(Math.random() * 256)) + ')';
        return hue;
    }
    playGame = function() {
        var car = document.querySelector(".car");
        var road = racing.getBoundingClientRect();
        moveRoad();
        moveEnemy(car);
        window.requestAnimationFrame(playGame);

    }
    var isCollide = function(car, item) {
        var carRect = car.getBoundingClientRect()
        var itemRect = item.getBoundingClientRect();
        //console.log(itemRect);
        return !(
            (carRect.bottom + 30 < itemRect.top + 30) ||
            (carRect.top + 30 > itemRect.bottom + 30) ||
            (carRect.right < itemRect.left) ||
            (carRect.left > itemRect.right)
        )
    }

    function moveEnemy(car) {
        let ene = document.querySelectorAll(".enemy");
        ene.forEach(function(item) {
            if (isCollide(car, item)) {
                endGame();
            }
            if (item.y >= 800) {
                item.y = -800;
                item.style.left = Math.floor(Math.random() * 250) + "px";
            }
            item.y += player.speed;
            item.style.top = item.y + "px";
        })
    }

    function endGame() {
        player.start = false;
        scoreDiv.innerHTML = "Game Over<br>You Scored ";
        startScreen.classList.remove("hide");
    }

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }


    var moveRoad = function() {
        var lines = document.querySelectorAll(".line");
        lines.forEach(function(item) {
            if (item.y >= 900) {
                item.y -= 900;
            }
            item.y += player.speed;
            item.style.margin = '20px';
            item.style.top = item.y + "px";
        })
    }
}



var raceGame = new carGame();
raceGame.init();