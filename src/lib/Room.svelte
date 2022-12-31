<script lang="ts">
    import { currentUser, pb } from './pocketbase';
    import { onMount } from 'svelte';
    import { renderablesStore, runData, runDataLeaveRoom, roomIdStore } from './stores';
    import RoomCanvas from './RoomCanvas.svelte';
    import type { UserPubinfoRecord } from './pocketbase-types';

    let currentUsers: { [id: string]: UserPubinfoRecord } = {};
    let roomId: string = $roomIdStore;
    let canvasComponent;

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

        // register an update function to run every 10 seconds
        async function sendUpdateReq() {
            if ($currentUser) {
                // fetch the info required to display the room
                const roomRecord = await pb.collection('rooms').getOne(roomId);
                const pubinfoRecords: Array<UserPubinfoRecord> = await pb.collection('user_pubinfo').getFullList(
                    roomRecord.current_users.length,
                    {filter: `\"${roomRecord.current_users.join()}\" ~ user_id`}
                );
                renewUserSprites(pubinfoRecords);
            }
        }

        function renewUserSprites(pubinfoRecords: Array<UserPubinfoRecord>) {
            let newRecords: Array<UserPubinfoRecord> = [];
            let deadRecords = {...currentUsers};
            for (const pubinfo of pubinfoRecords) {
                delete deadRecords[pubinfo.user_id];
                if (!currentUsers[pubinfo.user_id]) newRecords.push(pubinfo);
                currentUsers[pubinfo.user_id] = pubinfo;
            }
            for (const newRecord of newRecords) {
                canvasComponent.makeSprite(newRecord.user_id, newRecord.skin);
            }
            console.log(Object.values(deadRecords));
            for (const deadRecord of Object.values(deadRecords)) {
                canvasComponent.destroySprite(deadRecord.user_id);
                delete currentUsers[deadRecord.user_id];
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

    function newCatto(){
        
        let randomId = Math.floor(Math.random() * 1000000000);
        canvasComponent.makeSprite(randomId, "catto");
    }
    $: console.log($renderablesStore);

</script>

<p>ROOM</p>
<!-- Button updates runData, which then causes Room component to be destroyed, calling runDataLeaveRoom() with onDestroy() -->
<button on:click={() => {runData.update((prev) => ({...prev, isInRoom: false}))}}>LEAVE ROOM</button>
<button on:click={newCatto}>CREATE NEW CATTO</button>

<RoomCanvas bind:this={canvasComponent} />

<style>
    
</style>
