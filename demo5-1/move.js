function getStyle(element, attr) {
    //IE写法
    if (element.currentStyle) {
        return element.currentStyle[attr];
    //标准
    } else {
        return getComputedStyle(element, false)[attr];
    }
}
function startMove(element, attr, iTarget,func) {
    clearInterval(element.timer);
    element.timer = setInterval(function () {
        //因为速度要动态改变，所以必须放在定时器中
        var iCurrent = 0;
        if (attr === "opacity") { //为透明度时执行。
            iCurrent = Math.round(parseFloat(getStyle(element, attr)) * 100);
        } else { //默认情况
            iCurrent = parseInt(getStyle(element, attr)); //实际样式大小
        }
        var iSpeed = (iTarget - iCurrent) / 10; //(目标值-当前值)/缩放系数=速度
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed); //速度取整
        if (iCurrent === iTarget) {//结束运动
            clearInterval(element.timer);
             if (func) {
                    func();
                }
        } else {
            if (attr === "opacity") { //为透明度时，执行
                element.style.filter = "alpha(opacity:" + (iCurrent + iSpeed) + ")"; //IE
                element.style.opacity = (iCurrent + iSpeed) / 100; //标准
            } else { //默认
                element.style[attr] = iCurrent + iSpeed + "px";
            }
        }
    }, 30);
}