function carGame() {
    this.DIV_WIDTH = 550;
    this.DIV_HEIGHT = 700;
    this.CAR_WIDTH = 300;
    this.CAR_HEIGHT = 200;
    this.myCarPositionX = this.DIV_HEIGHT - this.CAR_HEIGHT;
    this.myCarPositionY = 200;
    this.element;
    this.car;
    var kyes = {
        ArrowLeft: false,
        ArrowRight: false
    }
    var racing = document.querySelector('.app')
        //var raceArea = document.querySelectorAll('.app');
    var player = {
        speed: 2,
        scor: 0

    };
    this.init = function() {
        this.generateRoad();
        moveRoad();
        this.setCarPosition();
        playGame();
        this.scoreCard();

    }
    this.scoreCard = function() {
        var scoreDiv = document.createElement('div');
        scoreDiv.classList.add('scoreDiv');
        scoreDiv.innerHTML = '<h2>SocreCard</h2>';
        racing.appendChild(scoreDiv);
    }
    this.setCarPosition = function() {
        this.car.style.top = (this.DIV_HEIGHT - this.CAR_HEIGHT) + 'px';
        this.car.style.left = (this.DIV_WIDTH) / 2 + 'px';
    }
    this.generateRoad = function() {
        racing.innerHTML = '';
        for (let i = 0; i < 10; i++) {
            let div = document.createElement("div");
            div.classList.add("line");
            div.y = i * 150;

            div.style.top = i + "px";
            racing.appendChild(div);
        }
        window.requestAnimationFrame(playGame);
        var car = document.createElement('div');
        car.classList.add('car');
        racing.appendChild(car);
        this.car = car;


        for (let i = 0; i < 3; i++) {
            let enemy = document.createElement("div");
            enemy.classList.add("enemy");
            enemy.innerHTML = (i + 1);
            enemy.y = ((i + 1) * 100) * -1;
            console.log(enemy.y);
            enemy.style.top = enemy.y + "px";
            enemy.style.left = Math.floor(Math.random() * 250) + "px";
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
            (carRect.bottom < itemRect.top) ||
            (carRect.top > itemRect.bottom) ||
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
                item.y = -600;
                item.style.left = Math.floor(Math.random() * 250) + "px";

            }
            item.y += player.speed;
            item.style.top = item.y + "px";
        })
    }

    function endGame() {
        // player.start = false;
        scoreDiv.innerHTML = "Game Over<br>You Scored ";
        //startScreen.classList.remove("hide");
    }



    var moveRoad = function() {
        var lines = document.querySelectorAll(".line");
        lines.forEach(function(item) {
            if (item.y >= 1000) {
                item.y -= 1000;
            }
            item.y += player.speed;
            item.style.margin = '20px';
            item.style.top = item.y + "px";
        })
    }
}



var raceGame = new carGame();
raceGame.init();