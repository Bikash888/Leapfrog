pipes = {

    _pipes: [],

    reset: function() {
        this._pipes = [];
    },

    update: function() {
        // add new pipe each 100 frames
        if (frames % 100 === 0) {
            // calculate y position
            var _y = height - (s_pipeSouth.height + s_fg.height + 120 + 100 * Math.random());
            // create and push pipe to array
            this._pipes.push({
                x: 500,
                y: _y,
                width: s_pipeSouth.width,
                height: s_pipeSouth.height
            });
        }
        for (var i = 0, len = this._pipes.length; i < len; i++) {
            var p = this._pipes[i];

            if (i === 0) {

                score += p.x === bird.x ? 1 : 0;
                var cx = Math.min(Math.max(bird.x, p.x), p.x + p.width);
                var cy1 = Math.min(Math.max(bird.y, p.y), p.y + p.height);
                var cy2 = Math.min(Math.max(bird.y, p.y + p.height + 80), p.y + 2 * p.height + 80);

                var dx = bird.x - cx;
                var dy1 = bird.y - cy1;
                var dy2 = bird.y - cy2;
                // vector length
                var d1 = dx * dx + dy1 * dy1;
                var d2 = dx * dx + dy2 * dy2;
                var r = bird.radius * bird.radius;
                // determine intersection
                if (r > d1 || r > d2) {
                    currentstate = states.Score;
                }
            }
            p.x -= 2;
            if (p.x < -p.width) {
                this._pipes.splice(i, 1);
                i--;
                len--;
            }
        }
    },
    draw: function(ctx) {
        for (var i = 0, len = this._pipes.length; i < len; i++) {
            var p = this._pipes[i];
            s_pipeSouth.draw(ctx, p.x, p.y);
            s_pipeNorth.draw(ctx, p.x, p.y + 80 + p.height);
        }
    }
}