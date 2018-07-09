(function () {

    var canvas, ctx;
    var thumbs;
    var savedImg = false;
    var loopId = -1;
    var direction = -1;

    var init = function () {
        initCanvas();
        initThumbs();
    };

    var initCanvas = function () {
        canvas = document.querySelector('canvas');
        ctx = canvas.getContext('2d');
        ctx.translate(-0.5, -0.5);
        canvas.addEventListener('click', posThumb);
    };

    var drawThumb = function () {
        ctx.drawImage(this, this.posX, this.posY, this.width, this.height);
    };

    var posThumb = function (e) {
        if (!savedImg)
            return false;
        savedImg.posX = e.offsetX - savedImg.width / 2;
        savedImg.posY = e.offsetY - savedImg.height / 2;
        savedImg.posY = (savedImg.posY < 0) ? 0 : savedImg.posY;
        savedImg.posY = (savedImg.posY + savedImg.height > canvas.height) ? canvas.height - savedImg.height : savedImg.posY;
        console.log(savedImg);
        //             
//             this
//        drawThumb.call(savedImg);
        window.cancelAnimationFrame(loopId);
        run();
    };

    var initThumbs = function () {
        thumbs = document.querySelectorAll('[data-role="thumbs"] > img');
        for (var i = 0, max = thumbs.length; i < max; i++) {
            thumbs[i].addEventListener('click', saveThumb);
        }
    };

    var saveThumb = function () {
        savedImg = this;
    };

    var run = function () {
        loopId = window.requestAnimationFrame(run);
        update();
        clear();
        draw();
    };
    var update = function () {
        savedImg.posY += 1 * direction;
        if (savedImg.posY < 0
                ||
                savedImg.posY + savedImg.height > canvas.height) {
            direction *= -1;
        }
    };
    var clear = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    var draw = function () {
        drawThumb.call(savedImg);
    };




    window.addEventListener('load', init);

})();