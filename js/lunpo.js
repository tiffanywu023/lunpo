// 辅助线函数
var ckXian = function() {
    var body  = document.querySelector('body')
    var style ='<style id="xm" media="screen"> * {outline: 1px red dashed!important} </style>'
    var i = false
    body.addEventListener('keydown', function(event) {
        if (event.keyCode === 77 && event.ctrlKey) {
            if (i) {
                var styletog = document.querySelector('#xm')
                styletog.remove()
                i = false
            } else {
                body.insertAdjacentHTML('afterbegin', style)
                i = true
            }
        }
    })
}() // 加载代码 使用 Ctrl + M 显示参考线

//轮播图部分
//显示当前大图
var showImg = function(index) {
    var newId = '#photo-' + String(index)
    removeClassAll('active')
    var current = e(newId)
    // log('current是什么', current)
    current.classList.add('active')
    var n = (-240) * (index)
    e('.lunpoBox').style.transform = `translateX(${n}px)`;
}
//上一张
var preImg = function() {
    var preButton = e('.pre')
    bindEvent(preButton, 'click', function(event) {
        var button = event.target
        log('点击了上一张', button)
        var father = button.parentElement
        var grandpa= father.parentElement
        // log('grandpa是什么', grandpa)
        //当前图片的下标
        var activeIndex = parseInt(grandpa.dataset.active)
        // log('当前图片的下标是', activeIndex)
        //图片的总数
        var total = parseInt(grandpa.dataset.imgs)
        var preIndex = (activeIndex - 1 + total) % total
        // log('前面一张图片的下标是', preIndex)
        showImg(preIndex)
        grandpa.dataset.active = preIndex
        log('现在图片的下标是', grandpa.dataset.active)
    })
}
//下一张
var nextImg = function() {
    var nextButton = e('.next')
    bindEvent(nextButton, 'click', function(event) {
        var button = event.target
        // log('点击了下一张', button)
        var father = button.parentElement
        var grandpa= father.parentElement
        // log('grandpa是什么', grandpa)
        // 当前图片的下标
        var activeIndex = parseInt(grandpa.dataset.active)
        // log('当前图片的下标是', activeIndex)
        // 图片的总数
        var total = parseInt(grandpa.dataset.imgs)
        var nextIndex = (activeIndex + 1 + total) % total
        // log('后面一张图片的下标是', nextIndex)
        showImg(nextIndex)
        grandpa.dataset.active = nextIndex
        log('现在图片的下标是', grandpa.dataset.active)
    })
}
//点击图片换图
var clickImg = function() {
    bindAll('.photo', 'click', function(event) {
        log('点击了图片')
        var clickImg = event.target
        log('点击的图片是', clickImg)
        var imgIndex = parseInt(clickImg.dataset.id)
        // log('dataset.id type是什么', typeof(clickImg.dataset.id))
        log('imgIndex是什么', imgIndex)
        var father = clickImg.parentElement
        // log('father是什么', father)
        var grandpa= father.parentElement
        // log('grandpa是什么', grandpa)
        var grandpapa = grandpa.parentElement
        // log('grandpapa是什么', grandpapa)
        showImg(imgIndex)
        grandpapa.dataset.active = imgIndex
    })
}
//自动播放图片
var autoPlay = function() {
    setInterval(function(){
        var currentImg = e('.active')
        var parent = currentImg.parentElement
        var grandpa = parent.parentElement
        var grandpapa = grandpa.parentElement
        var activeIndex = parseInt(grandpapa.dataset.active)
        // 图片的总数
        var total = parseInt(grandpapa.dataset.imgs)
        var nextIndex = (activeIndex + 1 + total) % total
        showImg(nextIndex)
        grandpapa.dataset.active = nextIndex
    }, 2000)
}

var _main = function() {
    preImg()
    nextImg()
    clickImg()
    autoPlay()
}

_main()
