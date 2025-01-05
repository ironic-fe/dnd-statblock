<script>
  import { getContext } from "svelte";

  const statblock = getContext("statblock");

  let input;
  export let name;
  export let label;
  export let type = "text";
  export let options = [];
  export let min = null;
  export let max = null;
  export let hidden = false;
</script>

<label {hidden}>
  <span>{label}:</span>
  {#if type == "select"}
    <select
      {name}
      bind:this={input}
      value={$statblock[name]}
      on:change={() => ($statblock[name] = input.value)}
    >
      {#each options as option}
        <option value={option.value}>{option.name}</option>
      {/each}
    </select>
  {:else}
    <input
      {type}
      {name}
      bind:this={input}
      value={$statblock[name]}
      on:change={() => ($statblock[name] = input.value)}
      {min}
      {max}
    />
  {/if}
</label>

<style>
  label > span {
    display: block;
  }
</style>
