<script lang="ts">
    import { currentUser, pb } from './pocketbase';
    import { onMount } from 'svelte';
    import { runData, runDataLeaveRoom } from './stores';
    import { onDestroy } from 'svelte';
    import RoomCanvas from './RoomCanvas.svelte';

    onMount(() => {
        // register a keepalive function to run every 30 seconds
        async function sendKeepalive() {
            if ($currentUser) {
                const data = {
                        "last_alive": new Date().toISOString(),
                    }
                pb.collection('users').update(pb.authStore.model.id, data)
            }
        }
        const keepalive = setInterval(sendKeepalive, 30 * 1000); // send the keepalive every 30 seconds
        sendKeepalive();

        return () => clearInterval(keepalive)
    });
    onDestroy(() => {
        runDataLeaveRoom()
    });

</script>

<p>ROOM</p>
<!-- Button updates runData, which then causes Room component to be destroyed, calling runDataLeaveRoom() with onDestroy() -->
<button on:click={() => {runData.update((prev) => ({...prev, isInRoom: false}))}}>LEAVE ROOM</button>

<RoomCanvas />

<style>
    
</style>
