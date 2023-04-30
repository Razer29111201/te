var bannerImgg = document.querySelector('.coating-imgg')
var coating = document.querySelector('.coating-body')
var img = document.querySelectorAll('.coating-img')
var left = document.querySelector('.move-left')
var right = document.querySelector('.move-right')
var payLeft = document.querySelector('.directional.left i ')
var payRight = document.querySelector('.directional.right i ')
var listPay = document.querySelector('.list-pay')
var indexImg = 0


function move(index) {
    img.forEach((element, index) => {

    });

    indexImg = index

    bannerImgg.src = img[indexImg].getAttribute('src')

}
move(0)



right.addEventListener('click', function () {
    if (indexImg == img.length - 1) {
        indexImg = 0
    } else {
        indexImg++
    }

    move(indexImg)
    console.log(indexImg)

    bannerImgg.style.animation = ' slide 0.5s linear forwards'
    coating.style.animation = 'slide1 0.5s linear forwards '

    setTimeout(function () {
        bannerImgg.style.animation = ''
        coating.style.animation = ''
    }, 500)


})

left.addEventListener('click', function () {
    if (indexImg == 0) {
        indexImg = img.length - 1
    } else {
        indexImg--
    }

    move(indexImg)
    console.log(indexImg)
    bannerImgg.style.animation = ' slide2 0.5s linear forwards'
    coating.style.animation = 'slide1 0.5s linear forwards '

    setTimeout(function () {
        bannerImgg.style.animation = ''
        coating.style.animation = ''
    }, 500)
})

payLeft.addEventListener('click', function () {
    listPay.style.animation = 'paymoveleft 1s linear '

})
payRight.addEventListener('click', function () {
    listPay.style.animation = 'paymoveright 1s linear forwards'

})


var inputSear = document.getElementById('search')
var btnSear = document.getElementById('search-btn')
var searHis = document.getElementById('sea-his')
console.log(searHis);
inputSear.onfocus = function () {
    if (searHis) {
        var div = document.createElement('div')


        div.innerHTML = `
    <ul id="root" class="search-his">
                        <li class="disabled">Lịch sử tìm kiếm</li>
                        <li >Lịch sử tìm kiếm</li>
                        <li >Lịch sử tìm kiếm</li>
                        
                    </ul>
    
    `

        searHis.appendChild(div)
        console.log(div)
    }
    searHis.appendChild(div)
    setTimeout(() => {
        document.querySelector('body').onclick = function () {
            searHis.removeChild(div)
        }
    }, 1000);

}




