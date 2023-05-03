
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

if (!getCookie('acc')) {

    $(document).ready(function () {

        $('.btn').each(function (i, e) {
            $(this).click(function () {
                var val = $('.input')[i].value
                var token = []
                token.push(val)
                var a = getCookie('token')
                token.push(a)
                console.log(token, a);
                setCookie('token', token, 1000)
                $.ajax({
                    url: '/product/cart/a',
                    type: 'get',
                    success: function (data) {
                        console.log(data);
                        if (data.length == 1) {
                            $('.cart_scroll').html('')
                            $('.cart_scroll').append(' <img src="https://png.pngtree.com/png-vector/20221104/ourlarge/pngtree-empty-paper-bag-isolated-on-white-background-png-image_6413917.png"alt=""><p>Chưa Có Sản Phẩm</p>')
                        }
                        if (data.length > 0) {
                            $('.cart_scroll').html('')
                        }
                        if (data.length > 0) {
                            $('#cart_leagth').text(data.length)
                            for (var i = 0; i < data.length; i++) {
                                $('.cart_scroll').append(
                                    `
                <div class="cart_product">
                    <input type="checkbox">
                    <img src="${data[i].img}"
                    alt="">
                    <div class="cart-title">
                        <p>${data[i].productname}</p>
                        <div class="cart_price">
                            <input value='${data[i].id}' hidden>
                        <p>${data[i].offprice}</p>
                      
                        <p class='del_item'>x</p>
                    </div>
                </div>
                </div>
    
            
                 `
                                )
                            }
                            if (data.length > 0) {
                                $('.cart_scroll').append(
                                    `<div class="cart_btn">
                    <button>Thanh Toán </button>
                     <button>Giỏ Hàng</button>
                    </div>`
                                )
                            }



                        }
                    }
                })
            })

        })
    })


    const loadcart = () => {
        $.ajax({
            url: '/product/cart/a',
            type: 'get',
            success: function (data) {
                console.log(data);
                if (data.length == 0) {
                    $('#cart_leagth').text(data.length)
                    $('.cart_scroll').html('')
                    $('.cart_scroll').append(' <img src="https://png.pngtree.com/png-vector/20221104/ourlarge/pngtree-empty-paper-bag-isolated-on-white-background-png-image_6413917.png"alt=""><p>Chưa Có Sản Phẩm</p>')
                }
                if (data.length > 0) {

                    $('.cart_scroll').html('')
                }
                if (data.length > 0) {
                    $('#cart_leagth').text(data.length)
                    for (var i = 0; i < data.length; i++) {
                        $('.cart_scroll').append(
                            `
        <div class="cart_product">
            <input type="checkbox" name="val" value="${data[i].id}">
            <img src="${data[i].img}"
            alt="">
            <div class="cart-title">
                <p>${data[i].productname}</p>
                <div class="cart_price">
                    <input value='${data[i].id}' hidden>
                    <p>${data[i].offprice}</p>
                   
                    <p class='del_item'>x</p>
                </div>
            </div>
        </div>

        
    `
                        )
                    }
                    if (data.length > 0) {
                        $('.cart_scroll').append(
                            `<div class="cart_btn">
            <button>Thanh Toán </button>
             <button>Giỏ Hàng</button>
            </div>`
                        )
                    }

                }
            }
        })
    }
    const del = () => {


        $(document).ready(function () {
            setInterval(() => {
                $('.del_item').each(function (i, e) {

                    $(this).click(function () {
                        par = e.parentElement.querySelector('input').value

                        var token = getCookie('token')
                        token.split(',')
                        var data = token.replace(String(par), ' ')

                        console.log(data, par);
                        setCookie('token', data, 1000)
                        loadcart()
                    })
                })
            }, 1000)
        })


    }

    del()
    loadcart()
}
else {
    $('.btn').each(function (i, e) {
        $(this).click(function () {
            var val = $('.input')[i].value
            $.ajax({
                url: "/cart",
                type: "post",
                dataType: "text",
                data: {
                    idproduct: val
                },
                success: (data) => {
                    console.log(data);
                    if (data) {
                        alert('Bạn Đã Thêm Sản Phẩm Từ Trước Đố')
                    }
                },
                error: (error) => { }

            })
        })
    })
    $(document).ready(function () {
        $('.btn').each(function (i, e) {
            $(this).click(function () {
                $.ajax({
                    url: "/cart",
                    type: "get",
                    success: (data) => {
                        if (data.length == 0) {
                            $('#cart_leagth').text(data.length)
                            $('.cart_scroll').html('')
                            $('.cart_scroll').append(' <img src="https://png.pngtree.com/png-vector/20221104/ourlarge/pngtree-empty-paper-bag-isolated-on-white-background-png-image_6413917.png"alt=""><p>Chưa Có Sản Phẩm</p>')
                        }
                        if (data.length > 0) {

                            $('.cart_scroll').html('')
                        }
                        if (data.length > 0) {
                            $('#cart_leagth').text(data.length)
                            for (var i = 0; i < data.length; i++) {
                                $('.cart_scroll').append(
                                    `
        <div class="cart_product">
            <input type="checkbox" class="val" name="val" value="${data[i].id}">
            <img src="${data[i].img}"
            alt="">
            <div class="cart-title">
                <p>${data[i].productname}</p>
                <div class="cart_price">
                    <input value='${data[i].id}' hidden>
                    <p>${data[i].offprice}</p>
                    <input type="number" name="" class="cart_number" id="cart_number" value="1">
                    <p class='del_item'>x</p>
                </div>
            </div>
        </div>

        
    `
                                )
                            }
                            if (data.length > 0) {
                                $('.cart_scroll').append(
                                    `<div class="cart_btn">
                                    <button id = "btn_payment">  <a href="/cart/payment">Thanh Toán</a> </button>
                     <button>Giỏ Hàng</button>
                    </div>`
                                )
                            }

                        } else {
                            console.log('lỗi');
                        }
                    }

                })
            })
        })
    })
    const updateview = () => {
        $.ajax({
            url: '/cart',
            type: 'get',
            success: function (data) {
                console.log(data);
                if (data.length == 0) {
                    $('#cart_leagth').text(data.length)
                    $('.cart_scroll').html('')
                    $('.cart_scroll').html(' <img src="https://png.pngtree.com/png-vector/20221104/ourlarge/pngtree-empty-paper-bag-isolated-on-white-background-png-image_6413917.png"alt=""><p>Chưa Có Sản Phẩm</p>')
                }
                if (data.length > 0) {

                    $('.cart_scroll').html('')
                }
                if (data.length > 0) {
                    $('#cart_leagth').text(data.length)
                    for (var i = 0; i < data.length; i++) {
                        $('.cart_scroll').append(
                            `
        <div class="cart_product">
            <input type="checkbox" name="val" class="val" value="${data[i].id}">
            <img src="${data[i].img}"
            alt="">
            <div class="cart-title">
                <p>${data[i].productname}</p>
                <div class="cart_price">
                    <input value='${data[i].id}' hidden>
                    <p>${data[i].offprice}</p>
                    <input type="number" name="" class="cart_number" id="cart_number" value="1">
                    <p class='del_item'>x</p>
                </div>
            </div>
        </div>
        
        
        `
                        )
                    }
                    if (data.length > 0) {
                        $('.cart_scroll').append(
                            `<div class="cart_btn">
                           <button id = "btn_payment">  <a href="/cart/payment">Thanh Toán</a> </button>
                                       <button>Giỏ Hàng</button>
            </div>`
                        )
                    }

                } else {
                    console.log('lỗi');
                }
            }
        })
    }
    updateview()

    const del = () => {


        $(document).ready(function () {
            setInterval(() => {

                $('.del_item').each(function (i, e) {

                    $(this).click(function () {

                        console.log(';');
                        par = e.parentElement.querySelector('input').value
                        $.ajax({
                            url: "/cart/delete",
                            type: "post",
                            dataType: "text",
                            data: {
                                id: par
                            },
                            success: (data) => {
                                console.log(data);
                                if (data) {
                                    updateview()
                                }
                            },
                            error: (error) => { }

                        })


                    })
                })
            }, 1000)

        })

    }
    del()

    $(document).ready(function () {
        setTimeout(() => {



            $('#btn_payment').click(function () {
                var value = []
                var number = []
                $('.val').each(function (i, e) {

                    if ($(this).is(":checked")) {
                        // it is checked
                        value.push($(this).val())
                        var num = $(this).parent().find($('.cart_number'))
                        number.push(num.val())
                    }
                })
                console.log(value);
                setCookie('id', value, 1)
                setCookie('num', number, 1)




            })

        }, 1000)

    })


}
