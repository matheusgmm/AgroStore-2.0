const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const inconClose = document.querySelector('.icon-close');


console.log (loginLink.textContent, registerLink.textContent);
registerLink.addEventListener("click", function () {
    wrapper.classList.add("click-enabled");
});

loginLink.addEventListener("click", function () {
    wrapper.classList.remove("click-enabled");
});

btnPopup.addEventListener("click", ()=> {
    wrapper.classList.add("active-popup");
});

inconClose.addEventListener("click", ()=> {
    wrapper.classList.remove("active-popup");
});