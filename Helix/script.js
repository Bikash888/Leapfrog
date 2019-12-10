function helix() {
    this.width = 840;
    this.height = 640;
    this.aniateWidth = 480;
    this.animateheight = 400;
    this.canvas;
    this.ctx;
    this.numberOfCycle = 2;
    this.columnNumber = 15;
    var that = this;
    this.waveMotion = 0.5;
    this.upperPart = 12;
    this.setCircleSize;
    this.offSet;
    this.frame = 0;
    this.setCirclemaxSize = 11;
    this.setXposition = 0;
    this.setYposition = 0;
    this.rowHeight = this.height / 2;
    this.init = function() {
        this.createHelixDiv();
    }
    this.createHelixDiv = function() {
        var helixCanvas = document.getElementById('canva');
        helixCanvas.style.width = this.width + 'px';
        helixCanvas.style.height = this.height + 'px';
        helixCanvas.style.backgroundColor = '#172936';
        this.ctx = helixCanvas.getContext('2d');
        this.draw();
    }
    this.draw = function() {
        that.ctx.fillStyle = 'green';
        that.ctx.rect(0, 0, this.width, this.height);
        that.ctx.fill();
        this.frame = requestAnimationFrame(that.draw) * 0.02;
        that.animate();
    }
    this.animate = function() {
        for (var curve = 0; curve < 2; curve++) {
            var sinusoidalCurve = this.frame + this.proportion(curve, 0, this.numberOfCycle, 0, 2 * Math.PI);
            console.log(sinusoidalCurve);
            for (var col = 0; col < this.columnNumber; col++) {
                var columnSet = this.proportion(col, 0, this.columnNumber, 0, 2 * Math.PI);
                this.setXposition = this.proportion(col, 0, this.columnNumber, 60, this.height - 60);
                for (var row = 0; row < this.upperPart; row++) {
                    this.setYposition = this.rowHeight + row * 12 + Math.sin(sinusoidalCurve + columnSet) * 60;
                    var setWidthRow = (Math.cos(sinusoidalCurve - (row / this.upperPart) + columnSet) + 1) * this.waveMotion;
                    this.setCircleSize = setWidthRow * this.setCirclemaxSize;
                    this.drawCircleMotion();
                }
            }
        }
    }
    this.drawCircleMotion = function() {
        this.ctx.beginPath();
        this.ctx.clearRect(200, 400, this.width, this.height);
        this.ctx.arc(200, 400, this.setCircleSize, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'red';
        this.ctx.fill();
        this.ctx.closePath();
    }
    this.proportion = function(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * ((value - low1) / (high1 - low1));
    }


}
var helix = new helix();
helix.init();