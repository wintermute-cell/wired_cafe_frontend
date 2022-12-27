<script lang="ts">
    import LandingScreen from "./lib/LandingScreen.svelte";
    import Login from "./lib/Login.svelte";
    import Room from "./lib/Room.svelte";
    import { currentUser, pb } from './lib/pocketbase';
    import { runData } from "./lib/stores";
</script>

<main>
     <Login /> <!-- Always show login, as it also handles logout -->
     {#if $currentUser}
         {#if $runData.isInRoom}
             <Room />
         {:else if $runData.isInCustomization}
             <Room />
         {:else}
             <LandingScreen />
         {/if}
     {/if}
    <button on:click={() => {console.log(pb.authStore.model)}}>Print Auth Model</button>
</main>

<style>
    :global(:root) {
        --bg_primary: #F7EBE6;
        --bg_secondary: #B39B8F;
        --bg_tertiary: #836C68;
        --fg_primary: #C7D1D6;
        --fg_secondary: #E5E5E5;
    }

    :global(body) {
        background-color: var(--bg_primary);
        color: var(--fg_primary);
    }
</style>
