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
var token = getCookie('acc')

$.ajax({
    url: '/account/dataacc',
    type: 'get',
    success: function (data) {
        console.log(data);
        if (data) {
            console.log($('nav--login'));
            $('.nav--login').addClass('hidden')
            $('.nav--login-suss').removeClass('hidden')
            $('#name_login').text(data.Name)
            if (
                data.role == 0
            ) {

                $('#admin').html(`<a href="/seller">
            <li>Admin</li>
        </a>`)
            }
        }

    }
})
if (!token) {
    console.log('a');
    $('.nav--login-suss').addClass('hidden')
    $('.nav--login').removeClass('hidden')
}
$('#logout').click(function () {
    setCookie('acc', '', -222)
    window.location.href('/account/register')
})