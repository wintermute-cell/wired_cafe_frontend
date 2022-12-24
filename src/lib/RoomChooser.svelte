<script lang="ts">
    import { fly } from 'svelte/transition';
    import { currentUser, pb } from './pocketbase';

    let errorMsg: string = "";

    const roomTypes: { type: string; name: string }[] = [
        {type: "test_room",  name: "Test Room Type"},
        {type: "test_room2", name: "Test Room Type 2"},
        {type: "test_room3", name: "Test Room Type 3"},
    ];

    function sendJoinRoomRequest(reqestedType: string) {
        pb.send(`/wired_cafe/rooms/join_best/${reqestedType}`, {})
        .then(response => { console.log(response); }, response => {errorMsg = response});
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
