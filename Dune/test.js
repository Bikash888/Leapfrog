function dune() {
    var c = document.createElement("canvas");
    var ctx = c.getContext("2d");
    c.width = 720;
    c.height = 480;

    document.body.appendChild(c);
    var that = this;
    var perm = [];
    while (perm.length < 20) {
        while (perm.includes(val = Math.floor(Math.random() * 255)));
        perm.push(val);
    }

    var lerp = (a, b, t) => a + (b - a) * (1 - Math.cos(t * Math.PI)) / 2;
    var noise = x => {
        x = x * 0.003 % 255;
        return lerp(perm[Math.floor(x)], perm[Math.ceil(x)], x - Math.floor(x));
    }

    this.init = function() {
        this.loop();
    }

    this.loop = function() {
        ctx.fillStyle = "#19f";
        ctx.fillRect(0, 0, c.width, c.height);

        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.moveTo(0, c.height);
        for (let i = 0; i < 20; i++) {
            console.log(noise(i));
            ctx.lineTo(i, c.height - noise(i));
        }
        // ctx.lineTo(c.width, c.height);
        ctx.fill();
        // requestAnimationFrame(that.loop);


    }

}
var dune = new dune();
dune.init();