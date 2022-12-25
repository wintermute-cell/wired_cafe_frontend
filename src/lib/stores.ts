import { writable } from "svelte/store";
import { pb } from './pocketbase';

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
export interface RoomData {
    type: string;
    other_users: Array<string>;
}

export const roomData = writable<RoomData>({ 
    type: "",
    other_users: [],
});

export function roomDataSet(type: string, other_users: Array<string>) {
    roomData.set({ 
        type: type,
        other_users: other_users,
    });
}

export function roomDataClear() {
    roomData.set({ 
        type: "",
        other_users: [],
    });
}
