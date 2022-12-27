<script lang="ts">
    import { currentUser, pb } from './pocketbase';
    import { runData, roomIdStore } from './stores';
    import type { RunData } from './stores';

    let errorMsg: string = "";

    const roomTypes: { type: string; name: string }[] = [
        {type: "test_room",  name: "Test Room Type"},
        {type: "test_room2", name: "Test Room Type 2"},
        {type: "test_room3", name: "Test Room Type 3"},
    ];

    function enterRoom(response: any) {
        runData.update((prev: RunData) => ({...prev, isInRoom: true}))
        roomIdStore.set(response.id)
    }

    function handleJoinSuccess(response: any) {
        console.log(response);
        enterRoom(response); 
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
