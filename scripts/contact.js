const name = document.querySelector("#name");
const email = document.querySelector("#email");
const message = document.querySelector("#userMessage");
const submitBtn = document.querySelector(".submit-btn");

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

email.addEventListener("input", () => {
    let userEmail = email.value;
    let isValidEmail = emailPattern.test(userEmail);

    if (isValidEmail) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
    } else {
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.5";
    }
});