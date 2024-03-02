
function getCookie(name){
    let parts = document.cookie.split(";")
    for(var n = 0; n < parts.length; n++) {
        let key = name + "=";
        let part = parts[n];
        if(" " === part.charAt(0)) {
            part = part.substring(1, part.length);
        }
        if(0 == part.indexOf(key)) {
            return part.substring(key.length, part.length)
        }
    }
    return null;
}

function setCookie(name, value, owner, isSecure, days = 2 * 31) {
    const d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    // let expires = "expires="+ d.toUTCString();
    let domain = owner? `; domain=${owner}` : "";
    let expires = `; expires=${d.toUTCString()}`;
    let secure = isSecure? "; Secure" : "";

    let cookie = name + "=" + (value || "") + domain + expires + "; path=/; samesite=strict" + secure;
    console.log(cookie);
    document.cookie = cookie;
}

export { getCookie, setCookie };