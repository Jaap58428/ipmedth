const homeStart = () => {
    let cookies = getCookies();

    // this is the general notation to check for cookie values
    // access a key of the array like array['key'] instead of
    // array.key to avoid js errors. 
    // also checking its value will always be of type String
    if (getLocalStorage('disclaimerAgreement') == true) {
        // when disclaimer is accepted before redirect to the homepage
        
        window.location = "menu.html";
    } else {
        // otherwise redirect to the disclaimer page
        window.location = "disclaimer.html";
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

const setCookie = (cname, cvalue, exdays) => {
    let d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  const getLocalStorage = (key) => {
      let data = localStorage.getItem(key)
      return JSON.parse(data);
  }

  const setLocalStorage = (key, object) => {
      localStorage.setItem(key, JSON.stringify(object));
  }