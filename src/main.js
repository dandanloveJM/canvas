let using = false;//是否按下
var eraserEnabled = false
var lastPoint = { x: undefined, y: undefined }
var canvas = document.getElementById("canvas");
var actions = document.getElementById("actions")
var context = canvas.getContext("2d");
var lineWidth = 5
autoSetSize()
listenToUser()




function autoSetSize() {
    setSize()
    window.onresize = function () {
        setSize()
    }
}
function setSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.moveTo(x1, y1)//起点
    context.lineWidth = lineWidth
    context.lineTo(x2, y2)//终点
    context.stroke()
    context.closePath()
}
function drawCircle(x, y, radius) {
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
    context.closePath()
}

function listenToUser() {
    thin_wrapper.onclick = function(){
        lineWidth = 5
        thin.classList.add("active")
        thick.classList.remove("active")
    }
    thick_wrapper.onclick = function(){
        lineWidth = 10
        thick.classList.add("active")
        thin.classList.remove("active")
    }
    black.onclick = function () {
        black.classList.add("active")
        red.classList.remove("active")
        yellow.classList.remove("active")
        blue.classList.remove("active")
        context.strokeStyle = "black"
    }
    red.onclick = function () {
        red.classList.add("active")
        black.classList.remove("active")
        yellow.classList.remove("active")
        blue.classList.remove("active")
        context.strokeStyle = "red"
    }
    yellow.onclick = function () {
        yellow.classList.add("active")
        black.classList.remove("active")
        red.classList.remove("active")
        blue.classList.remove("active")
        context.strokeStyle = "yellow"
    }
    blue.onclick = function () {
        blue.classList.add("active")
        black.classList.remove("active")
        red.classList.remove("active")
        yellow.classList.remove("active")
        context.strokeStyle = "blue"
    }

    eraser.onclick = function () {
        eraserEnabled = true
        // actions.className = "actions eraserEnabled"
        eraser.classList.add("active")
        pen.classList.remove("active")
    }
    pen.onclick = function () {
        eraserEnabled = false
        pen.classList.add("active")
        eraser.classList.remove("active")
    }
    clear.onclick = function(){
        context.clearRect(0, 0, canvas.width, canvas.height)
    }
    download.onclick = function(){
        var url = canvas.toDataURL()
        console.log(url)
        var a = document.createElement("a")
        a.download = "myPainting.png"
        a.href = url
        a.click()
    }
    if ("ontouchstart" in document.documentElement) {
        canvas.ontouchstart = function (a) {
            console.log("开始摸了")
            using = true
            var x = a.touches[0].clientX
            var y = a.touches[0].clientY
            lastPoint.x = x
            lastPoint.y = y
        }
        canvas.ontouchmove = function (a) {
            var x = a.touches[0].clientX
            var y = a.touches[0].clientY
            if (using) {
                if (eraserEnabled) {
                    context.clearRect(x - 5, y - 5, 20, 20)
                }
                else {
                    var newPoint = { x: x, y: y }
                    // drawCircle(x, y, 1)
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    lastPoint = newPoint
                }

            }
        }
        canvas.ontouchend = function () {
            using = false
        }
    } else {
        canvas.onmousedown = function (a) {
            using = true
            var x = a.clientX
            var y = a.clientY
            lastPoint.x = x
            lastPoint.y = y
            // drawCircle(x, y, 1)
        }
        canvas.onmousemove = function (a) {
            var x = a.clientX
            var y = a.clientY
            if (using) {
                if (eraserEnabled) {
                    context.clearRect(x - 5, y - 5, 20, 20)
                }
                else {
                    var newPoint = { x: x, y: y }
                    // drawCircle(x, y, 1)
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    lastPoint = newPoint
                }

            }
        }
        canvas.onmouseup = function () {
            using = false
        }
    }
}