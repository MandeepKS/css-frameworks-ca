// import { registerFormListener } from "./handlers/register.mjs";
import { loginFormListener } from "./handlers/login.mjs";
loginFormListener();
// registerFormListener();

const path = location.pathname;

// if (path === "/profile/login") {
//     loginFormListener();
// } else if (path === "/profile/register") {
//     registerFormListener();
// }