import { writable, type Writable } from "svelte/store";
import { pb } from './pocketbase';
import type { Renderable } from "./rendering";

// ---------------------------------------------------------------------------
// RUN DATA: a store for general information about the flow of the application
// ---------------------------------------------------------------------------
export interface RunData {
    isInRoom: boolean;
    isInCustomization: boolean;
}

export const runData = writable<RunData>({ 
    isInRoom: false,
    isInCustomization: false,
});

export function runDataLeaveRoom() {
    runData.update((prev: RunData) => ({...prev, isInRoom: false}))
    pb.send(`/wired_cafe/rooms/leave`, {})
    .then(response => { console.log(response); }, response => { console.log(response) });
}


// ---------------------------------------------------------------------------
// ROOM DATA: a store for information about the room the user currently is in
// ---------------------------------------------------------------------------
export const roomIdStore = writable<string>();

export const renderablesStore: Writable<Array<Renderable>> = writable([]);
