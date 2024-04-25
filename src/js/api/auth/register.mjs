//This code sends the register form data to the api
import { API_SOCIAL } from "../constants.mjs";

const action = "/auth/register";
const method = "post";
const registerURL = API_SOCIAL + action;

export async function register(profile) {  
  try {
   
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
    return result;
} catch (error) {
    console.log(error); 
}
}

