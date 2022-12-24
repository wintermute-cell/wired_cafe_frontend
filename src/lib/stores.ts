import { writable } from "svelte/store";

export const runData = writable({ 
    isLoggedIn: true,
});
