<script lang="ts">
    import { currentUser, pb } from './pocketbase';
    import { onMount } from 'svelte';
    import { renderablesStore, runData, runDataLeaveRoom, roomIdStore } from './stores';
    import RoomCanvas from './RoomCanvas.svelte';
    import type { Renderable } from './rendering';
    import { skins } from './asset_locations'

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

        // store the current room data.
        let roomId: string = $roomIdStore;

        // register an update function to run every 10 seconds
        async function sendUpdateReq() {
            if ($currentUser) {
                // fetch the info required to display the room
                const roomRecord = await pb.collection('rooms').getOne(roomId);
                const othersPubinfoRecords = await pb.collection('user_pubinfo').getFullList(
                    roomRecord.current_users.length,
                    {filter: `\"${roomRecord.current_users.join()}\" ~ user_id`}
                );
                // process the Pubinfo entries to renderables
                for (const pubinfo of othersPubinfoRecords) {
                    let newRenderable: Renderable = {
                        spriteSrc: skins[pubinfo.skin],
                        isAnimated: false,
                        animationAtlas: null,
                    }
                    renderablesStore.update(prev => [...prev, newRenderable]);
                }
            }
        }
        const updates = setInterval(sendUpdateReq, 10 * 1000);
        sendUpdateReq();

        // clear the keepalive sender after the Room component is destroyed
        return () => {
            runDataLeaveRoom();
            clearInterval(keepalive);
            clearInterval(updates);
        }
    });

</script>

<p>ROOM</p>
<!-- Button updates runData, which then causes Room component to be destroyed, calling runDataLeaveRoom() with onDestroy() -->
<button on:click={() => {runData.update((prev) => ({...prev, isInRoom: false}))}}>LEAVE ROOM</button>

<RoomCanvas />

<style>
    
</style>
