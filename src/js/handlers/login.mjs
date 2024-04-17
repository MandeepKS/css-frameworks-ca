import { login } from "../api/auth/login.mjs";

export function loginFormListener() {
    const form = document.querySelector("#loginForm");

    form.addEventListener("submit", (e) => { 
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const profile = Object.fromEntries(formData.entries());

        login(profile);
    });
}