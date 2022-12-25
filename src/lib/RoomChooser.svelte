<script lang="ts">
    import { currentUser, pb } from './pocketbase';
    import { runData, roomData, roomDataSet } from './stores';
    import type { RunData, RoomData } from './stores';

    let errorMsg: string = "";

    const roomTypes: { type: string; name: string }[] = [
        {type: "test_room",  name: "Test Room Type"},
        {type: "test_room2", name: "Test Room Type 2"},
        {type: "test_room3", name: "Test Room Type 3"},
    ];

    function enterRoom() {
        runData.update((prev: RunData) => ({...prev, isInRoom: true}))
    }

    function handleJoinSuccess(response: any) {
        console.log(response);
        // remove self from other_users
        const idx = response.current_users.indexOf(pb.authStore.model.id);
        let other_users: Array<string>;
        if (idx >= 0) { 
            other_users =  response.current_users.splice(idx, 1);
        }
        roomDataSet(response.type, other_users);
        enterRoom(); 
    }
    function handleJoinFailure(response: any) {
        errorMsg = response;
    }

    function sendJoinRoomRequest(requestedType: string) {
        pb.send(`/wired_cafe/rooms/join_best/${requestedType}`, {})
        .then(
            response => {handleJoinSuccess(response)},
            response => {handleJoinFailure(response)}
        );
    }
</script>


<h2>Room Chooser</h2>
<ul>
    {#each roomTypes as rType}
        <li>
        <button class="room_button" on:click={() => {errorMsg = ""; sendJoinRoomRequest(rType.type)}}>
            {rType.name}
        </button>
        </li>        
    {/each}
    {#if errorMsg != ""}
        <p id="error_msg">{errorMsg}</p>
    {/if}
</ul>
<style>
    .room_button {
            background-color: var(--bg_secondary);
        }
    #error_msg {
            color: red;
        }
</style>
