<script lang="ts">
    import LandingScreen from "./lib/LandingScreen.svelte";
    import Login from "./lib/Login.svelte";
    import { currentUser, pb } from './lib/pocketbase';
    import { onDestroy, onMount } from 'svelte';

    // register a keepalive function to run every 30 seconds
    onMount(() => {
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
</script>

<main>
     <Login /> <!-- Always show login, as it also handles logout -->
     {#if $currentUser}
         <LandingScreen />
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
