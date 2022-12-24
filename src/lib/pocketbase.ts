import PocketBase from "pocketbase";
import { writable } from "svelte/store";

// registering custom actions
//PocketBase.prototype.JoinBest = function(bodyData = {}, queryParams = {}) {
//    return this.send('/wired_cafe/rooms/join_best', {
//        'method': 'POST',
//        'params': queryParams,
//        'body':   bodyData,
//        'headers': { }
//    });
//}

export const pb = new PocketBase('http://127.0.0.1:8090');
export const currentUser = writable();

pb.authStore.onChange((auth) => {
    console.log('authStore changed', auth);
    currentUser.set(pb.authStore.model);
});
