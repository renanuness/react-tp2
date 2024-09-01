export function getUserLogged() {
    let u = {};
    u.name = getItemFromLocalStorage("@name");
    u.email = getItemFromLocalStorage("@email");
    u.token = getItemFromLocalStorage("@token");
    u.theme = getItemFromLocalStorage("@theme");

    if (u.name && u.email && u.token) {
        return u;
    } else {
        return false;
    }
}

export function setLocalStorageInfo(user) {
    localStorage.setItem("@email", user.email);
    localStorage.setItem("@name", user.name);
    localStorage.setItem("@token", user.token);
    localStorage.setItem("@theme", "light");
}

function getItemFromLocalStorage(key) {
    let value = localStorage.getItem(key);
    return value ? value : null;
}
