<script lang="ts">
    import { currentUser, pb } from './pocketbase';
    import { fly } from 'svelte/transition';
    import { runData, runDataLeaveRoom } from './stores';

  let username: string;
  let email: string;
  let password: string;

  let isSignupMode: boolean = false;

  async function login() {
    const user = await pb.collection('users').authWithPassword(username, password);
    console.log(user)
  }

  async function signUp() {
    try {
      const data = {
        "username": username,
        "email": email,
        "emailVisibility": true,
        "password": password,
        "passwordConfirm": password
      };
      const createdUser = await pb.collection('users').create(data);
      await login();
    } catch (err) {
      console.error(err)
    }
  }

  function signOut() {
      if ($runData.isInRoom) { runDataLeaveRoom(); }
      pb.authStore.clear();
  }

  async function joinRoom() {
    pb.send('/wired_cafe/rooms/join_best/test_room2', {})
  }

</script>

{#if $currentUser}
  <p>
    Signed in as {$currentUser.username} 
    <button on:click={joinRoom}>Join Test Room</button>
    <button on:click={signOut}>Sign Out</button>
  </p>
{:else}
  <form on:submit|preventDefault id="signin-form">
    <input
      placeholder="Username"
      type="text"
      bind:value={username}
    />
    <br>

    <input 
      placeholder="Password" 
      type="password" 
      bind:value={password} 
    />
    <br>

    <button on:click={login}>Login</button>
    <br>
    {#if isSignupMode == true}
        <input transition:fly="{{ x: 200, duration: 500 }}"
          placeholder="E-Mail"
          type="text"
          bind:value={email}
        />
        <br>
        <button on:click={signUp}>Sign Up</button>
    {:else}
        <button on:click={() => {isSignupMode = true}}>Sign Up</button>
    {/if}
  </form>
{/if}

<style>
form {
    padding: 4em;
    border-radius: 24px;
    box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.2);
    background-color: var(--bg_secondary);

    }
form * {
    margin: 0.5em 0 0.5em 0;
    }
form input {
    height: 2em;
    }
</style>
