//This code sends the register form data to the api
import { API_SOCIAL } from "../constants.mjs";

const action = "/auth/register";
const method = "post";


export async function register(profile) {  
    const registerURL = API_SOCIAL + action;
    const body = JSON.stringify(profile);
    const response = await fetch(registerURL, {
        headers: {
            "Content-Type": "application/json",
        },
        method,
        body
    })

    const result = await response.json();
    console.log(result);   
}
