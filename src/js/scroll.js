export default function (Vue) {
    function Scroll(dom) {
        this.dom = dom;
        this.startX = 0;
        this.oldX = 0;
        this.max = -(dom.offsetWidth - dom.parentNode.offsetWidth);
        this.init();
    }
    // 标签页函数原型
    Scroll.prototype = {
        constructor: Scroll,
        init: function () {
            this.swiper();
            this.tap();
        },
        swiper: function () {
            var _this = this;
            _this.dom.addEventListener("touchstart", function (e) {
                if (e.targetTouches.length > 1) {
                    return;
                }
                _this.startX = e.targetTouches[0].clientX;
            });
            _this.dom.addEventListener("touchmove", function (e) {
                if (e.targetTouches.length > 1) {
                    return;
                }
                // 样式初始化
                // for (var i = 0; i < this.children.length; i++) {
                //     this.children[i].children[0].style.color = "#000";
                // }


                var moveX = e.targetTouches[0].clientX - _this.startX + _this.oldX;
                if (moveX >= 50) {
                    moveX = 50;
                } else if (moveX <= _this.max - 50) {
                    moveX = _this.max - 50;
                }
                this.style.transition = "none";
                this.style.transform = "translateX(" + moveX + "px)";
            });
            _this.dom.addEventListener("touchend", function (e) {
                if (e.changedTouches.length > 1) {
                    return;
                }


                _this.oldX += e.changedTouches[0].clientX - _this.startX;
                // console.log(oldX);
                if (_this.oldX >= 0) {
                    _this.oldX = 0;
                    this.style.transition = "all 0.3s";
                    this.style.transform = "translateX(0px)";
                } else if (_this.oldX <= _this.max) {
                    _this.oldX = _this.max;
                    this.style.transition = "all 0.3s";
                    this.style.transform = "translateX(" + _this.max + "px)";
                }


            });
        },
        tap: function () {
            var _this = this;
            var startX, startY;
            var startTime;
            _this.dom.addEventListener("touchstart", function (e) {
                if (e.targetTouches.length > 1) {
                    return;
                }
                startX = e.targetTouches[0].clientX;
                startY = e.targetTouches[0].clientY;
                startTime = Date.now();
            });
            _this.dom.addEventListener("touchend", function (e) {
                if (e.changedTouches.length > 1) {
                    return;
                }
                var endX = e.changedTouches[0].clientX;
                var endY = e.changedTouches[0].clientY;
                if (Math.abs(endX - startX) > 5) {
                    return;
                }
                if (Math.abs(endY - startY) > 5) {
                    return;
                }
                var endTime = Date.now();
                if (endTime - startTime > 500) {
                    return;
                }
                _this.handleFN(e);
            });
        },
        handleFN: function (e) {
            var _this = this;
            if (e.target.nodeName == "A") {
                var clickLeft = e.target.parentNode.offsetLeft;
                if (-clickLeft < _this.max) {
                    clickLeft = -_this.max;
                }
                _this.oldX = -clickLeft;
                _this.dom.style.transition = "all 0.3s";
                _this.dom.style.transform = "translateX(-" + clickLeft + "px)";
                var lis = e.target.parentNode.parentNode.children;
                for (var i = 0; i < lis.length; i++) {
                    lis[i].children[0].style.color = "deepskyblue";
                    lis[i].style.borderBottom = "";
                }
                e.target.parentNode.style.borderBottom = "1px solid deepskyblue";
            }
        }
    }
    Vue.prototype.Scroll = Scroll;
}