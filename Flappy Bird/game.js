var
    canvas,
    ctx,
    width,
    height,
    fgpos = 0,
    frames = 0,
    score = 0,
    best = localStorage.getItem("best") || 0,
    currentstate,
    states = {
        Splash: 0,
        Game: 1,
        Score: 2
    },
    okbtn

function onpress(evt) {

    switch (currentstate) {
        case states.Splash:
            currentstate = states.Game;
            bird.jump();
            break;
        case states.Game:
            bird.jump();
            break;
        case states.Score:
            var mx = evt.offsetX,
                my = evt.offsetY;
            if (mx == null || my == null) {
                mx = evt.touches[0].clientX;
                my = evt.touches[0].clientY;
            }
            if (okbtn.x < mx && mx < okbtn.x + okbtn.width &&
                okbtn.y < my && my < okbtn.y + okbtn.height
            ) {
                pipes.reset();
                currentstate = states.Splash;
                score = 0;
            }
            break;

    }
}

function main() {
    canvas = document.createElement("canvas");
    width = window.innerWidth;
    height = window.innerHeight;

    var evt = "touchstart";
    if (width >= 500) {
        width = 320;
        height = 480;
        canvas.style.border = "1px solid #000";
        evt = "mousedown";
    }
    document.addEventListener(evt, onpress);
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d");
    currentstate = states.Splash;
    document.body.appendChild(canvas);
    var img = new Image();
    img.onload = function() {
        initSprites(this);
        ctx.fillStyle = s_bg.color;
        okbtn = {
            x: (width - s_buttons.Ok.width) / 2,
            y: height - 200,
            width: s_buttons.Ok.width,
            height: s_buttons.Ok.height
        }

        run();
    }
    img.src = "images/sheet.png";
}

function run() {
    var loop = function() {
        update();
        render();
        window.requestAnimationFrame(loop, canvas);
    }
    window.requestAnimationFrame(loop, canvas);
}

function update() {
    frames++;

    if (currentstate !== states.Score) {
        fgpos = (fgpos - 2) % 14;
    } else {
        best = Math.max(best, score);
        localStorage.setItem("best", best);
    }
    if (currentstate === states.Game) {
        pipes.update();
    }

    bird.update();
}

function render() {
    ctx.fillRect(0, 0, width, height);
    s_bg.draw(ctx, 0, height - s_bg.height);
    s_bg.draw(ctx, s_bg.width, height - s_bg.height);
    pipes.draw(ctx);
    bird.draw(ctx);
    s_fg.draw(ctx, fgpos, height - s_fg.height);
    s_fg.draw(ctx, fgpos + s_fg.width, height - s_fg.height);
    var width2 = width / 2;
    if (currentstate === states.Splash) {
        s_splash.draw(ctx, width2 - s_splash.width / 2, height - 300);
        s_text.GetReady.draw(ctx, width2 - s_text.GetReady.width / 2, height - 380);
    }
    if (currentstate === states.Score) {
        s_text.GameOver.draw(ctx, width2 - s_text.GameOver.width / 2, height - 400);
        s_score.draw(ctx, width2 - s_score.width / 2, height - 340);
        s_buttons.Ok.draw(ctx, okbtn.x, okbtn.y);
        s_numberS.draw(ctx, width2 - 47, height - 304, score, null, 10);
        s_numberS.draw(ctx, width2 - 47, height - 262, best, null, 10);

    } else {
        s_numberB.draw(ctx, null, 20, score, width2);

    }
}
main();