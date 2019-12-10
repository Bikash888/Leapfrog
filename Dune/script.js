function duneGame() {
    this.width = 800;
    this.height = 600;
    this.ctx;
    var that = this;
    var perm = [];
    while (perm.length < 255) {
        while (perm.includes(val = Math.floor(Math.random() * 255)));
        perm.push(val);
    }

    var lerp = (a, b, t) => a + (b - a) * (1 - Math.cos(t * Math.PI)) / 2;
    var noise = x => {
        //    x = x * 0.01 % 254;
        return lerp(perm[Math.floor(x)], perm[Math.ceil(x)], x - Math.floor(x));
    }

    this.init = function() {



        this.gameBox();
        this.draw();
        this.player();

    }
    this.gameBox = function() {
        var Canvas = document.getElementById('my_canvas');
        Canvas.style.width = this.width + 'px';
        Canvas.style.height = this.height + 'px';
        Canvas.style.backgroundColor = '#172936';
        this.ctx = Canvas.getContext('2d');

    }
    this.draw = function() {
        that.ctx.fillStyle = 'green';
        that.ctx.fillRect(0, 0, this.width, this.height);
        that.ctx.fillStyle = 'black';
        that.ctx.beginPath();
        for (let index = 0; index < this.width; index++)
            that.ctx.lineTo(index, noise(index));
        that.ctx.fill();

        requestAnimationFrame(that.draw);
    }
    this.player = function() {

    }

}
var dune = new duneGame();
dune.init();