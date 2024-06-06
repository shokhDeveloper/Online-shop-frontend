const getItem = (key) => window.localStorage.getItem(key);
const setItem = (key, value) => window.localStorage.setItem(key, typeof value == "object" ? JSON.stringify(value): value);
const toCheckToken = (token) => {
    if(!token){
        window.location.replace("/register")
    }
}
const toCheckTokenSign = (token) => {
    if(token){
        window.location.replace("/")
    }
}
const IP = '192.168.1.105';