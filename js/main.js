const homeStart = () => {
    let cookies = getCookies();

    console.log(cookies);


    if (cookies['disclaimerAccepted'] == 'true') {
        window.location = "menu.html";
    } else {
        window.location = "disclaimer.html";
        console.log('cookies are not present!');
    }
}

const getCookies = () => {
    let cookieObject = {}
    let cookies = decodeURIComponent(document.cookie).split(';');

    cookies.forEach(cookie => {
        let tuple = cookie.split('=');
        cookieObject[tuple[0].trim()] = tuple[1];
    });

    return cookieObject

}