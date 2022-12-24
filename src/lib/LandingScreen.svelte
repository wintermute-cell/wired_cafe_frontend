<script lang="ts">
    import { currentUser, pb } from './pocketbase';
    import { fly } from 'svelte/transition';
    import RoomChooser from './RoomChooser.svelte'
    import { onDestroy } from 'svelte';

    // the currentMode indicated what kind of menu should be shown
    enum Mode {
        Landing,
        ChooseRoom,
        Customzie,
    }
    let currentMode: Mode = Mode.Landing;

    onDestroy(() => {
        currentMode = Mode.Landing;
        });
</script>

{#if currentMode == Mode.Landing}
    <button on:click={() => {currentMode = Mode.ChooseRoom}} class="landing_panel" id="choose_room_panel">
        CHOOSE ROOM
    </button>
    <button on:click={() => {currentMode = Mode.Customzie}} class="landing_panel" id="customize_panel">
        CUSTOMIZE
    </button>
{:else if currentMode == Mode.ChooseRoom}
    <button on:click={() => {currentMode = Mode.Landing}} class="return_to_landing_button">
        RETURN
    </button>
    <RoomChooser />
{:else if currentMode == Mode.Customzie}
    <button on:click={() => {currentMode = Mode.Landing}} class="return_to_landing_button">
        RETURN
    </button>
    CUSTOMIZE MENU
{/if}

<style>
    .landing_panel {
            width: 25em;
            height: 40em;
            background-color: var(--bg_secondary);
            float: left;
            margin: 0 2em 0 2em;
        }
    .landing_panel:hover {
            box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.2);
        }
</style>
