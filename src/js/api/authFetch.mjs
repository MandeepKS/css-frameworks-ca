import { load } from "../storage/index.mjs";

/**
 * a function that loads the autorization token from local storage and returns it
 * @returns
 */

export function headers() {
  const token = load("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

/**
 * a function that fetches data from the api with the authorization token
 * @param {string} url API url
 * @param {object} options data
 * @returns
 */

export async function authFetch(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: headers(),
  });
}

/**
 * a function that fetches the profile information from the api
 * @returns
 */

export function profileInfo() {
  return load("profile");
}
