document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("loginForm");

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    const passwordToggle = document.getElementById("passwordToggle");

    const emailGroup = emailInput.closest(".form-group");
    const passwordGroup = passwordInput.closest(".form-group");


    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }


    emailInput.addEventListener("input", () => {

        if (emailInput.value.trim() === "") {
            emailGroup.classList.add("error");
            emailError.textContent = "Email is required";

        } else if (!validateEmail(emailInput.value)) {
            emailGroup.classList.add("error");
            emailError.textContent = "Enter a valid email";

        } else {
            emailGroup.classList.remove("error");
            emailError.textContent = "";
        }

    });


    passwordInput.addEventListener("input", () => {

        if (passwordInput.value.trim() === "") {
            passwordGroup.classList.add("error");
            passwordError.textContent = "Password is required";

        } else if (passwordInput.value.length < 6) {
            passwordGroup.classList.add("error");
            passwordError.textContent = "Password must be at least 6 characters";

        } else {
            passwordGroup.classList.remove("error");
            passwordError.textContent = "";
        }

    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let isValid = true;

  
        if (emailInput.value.trim() === "" || !validateEmail(emailInput.value)) {
            emailGroup.classList.add("error");
            emailError.textContent = "Enter a valid email";
            isValid = false;
        }

        if (passwordInput.value.trim() === "" || passwordInput.value.length < 6) {
            passwordGroup.classList.add("error");
            passwordError.textContent = "Password must be at least 6 characters";
            isValid = false;
        }

        if (isValid) {
            window.location.href = "home.html";
        }

    });

    passwordToggle.addEventListener("click", () => {

        const isPassword = passwordInput.type === "password";
        passwordInput.type = isPassword ? "text" : "password";

    });

});