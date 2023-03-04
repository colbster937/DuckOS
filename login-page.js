const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "Arthur" && password === "()()123()") {
        open("/redirect.html")
    } else {
        loginErrorMsg.style.opacity = 1;
    }
    if (username === "ADMIN" && password === "test") {
        open("/redirect.html")
    } else {
        loginErrorMsg.style.opacity = 1;
    }
    if (username === "HelloDudWow" && password === "ERICISALEBA") {
        open("/redirect.html")
    } else {
        loginErrorMsg.style.opacity = 1;
    }
    if (username === "Yoshi" && password === "97193") {
        open("/redirect.html")
    } else {
        loginErrorMsg.style.opacity = 1;
    }
    if (username === "NeilM" && password === "123456") {
        open("/redirect.html")
    } else {
        loginErrorMsg.style.opacity = 1;
    }
    if (username === "evan" && password === "123456") {
        open("/redirect.html")
    } else {
        loginErrorMsg.style.opacity = 1;
    }
    if (username === "ghgi" && password === "443") {
        open("/redirect.html")
    } else {
        loginErrorMsg.style.opacity = 1;
    }
    if (username === "g4o2" && password === "god") {
        open("/redirect.html")
    } else {
        loginErrorMsg.style.opacity = 1;
    }
    if (username === "my name" && password === "byeadmin") {
        open("/redirect.html")
    } else {
        loginErrorMsg.style.opacity = 1;
    }
    if (username === "Neel" && password === "4235") {
        open("/redirect.html")
    } else {
        loginErrorMsg.style.opacity = 1;
    }
    if (username === "afterwords" && password === "123456789") {
        open("/redirect.html")
    } else {
        loginErrorMsg.style.opacity = 1;
    }
    if (username === "Elena" && password === "1234") {
        open("/redirect.html")
    } else {
        loginErrorMsg.style.opacity = 1;
    }
    if (username === "Momo" && password === "Marshmallow") {
        open("/redirect.html")
    } else {
        loginErrorMsg.style.opacity = 1;
    }
    if (username === "rushilc" && password === "Rushil2009!!") {
        open("/redirect.html")
    } else {
        loginErrorMsg.style.opacity = 1;
    }
    if (username === "Krish" && password === "Bhejafry13@1234") {
        open("/redirect.html")
    } else {
        loginErrorMsg.style.opacity = 1;
    }
  
  
})
