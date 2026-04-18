
document.addEventListener("DOMContentLoaded",() => {

    const form = document.getElementById("registerForm");
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm_password");

    const usernameError = document.getElementById("usernameError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const confirmError = document.getElementById("confirmError");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    

    username.addEventListener("input",()=>{
        if(username.value.trim() === ""){
            username.classList.add("error");
            username.classList.remove("success");
            usernameError.textContent = "Full name is required";
        }
        else{
            username.classList.remove("error");
            username.classList.add("success");
            usernameError.textContent = "";
        }
    });

    email.addEventListener("input", () => {
        if (email.value.trim() === "") {
            email.classList.add("error");
            email.classList.remove("success");
            emailError.textContent = "Email is required";
        } else if (!emailRegex.test(email.value)) {
            email.classList.add("error");
            email.classList.remove("success");
            emailError.textContent = "Enter valid email";
        } else {
            email.classList.remove("error");
            email.classList.add("success");
            emailError.textContent = "";
        }
    });

    password.addEventListener("input", () => {
        if (password.value.length < 6) {
            password.classList.add("error");
            password.classList.remove("success");
            passwordError.textContent = "Password must be 6+ characters";
        } else {
            password.classList.remove("error");
            password.classList.add("success");
            passwordError.textContent = "";
        }

        // نعيد فحص ال confirm لما الباس يتغير
        confirmPassword.dispatchEvent(new Event("input"));
    });

    confirmPassword.addEventListener("input", () => {
        if (
            confirmPassword.value !== password.value ||
            confirmPassword.value === ""
        ) {
            confirmPassword.classList.add("error");
            confirmPassword.classList.remove("success");
            confirmError.textContent = "Passwords do not match";
        } else {
            confirmPassword.classList.remove("error");
            confirmPassword.classList.add("success");
            confirmError.textContent = "";
        }
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // نشغّل validation على كل inputs
        username.dispatchEvent(new Event("input"));
        email.dispatchEvent(new Event("input"));
        password.dispatchEvent(new Event("input"));
        confirmPassword.dispatchEvent(new Event("input"));

        // check لو كله success
        const inputs = [username, email, password, confirmPassword];

        const isValid = inputs.every(input =>
            input.classList.contains("success")
        );

        if (isValid) {
            window.location.href = "login.html";
        }
    });

});