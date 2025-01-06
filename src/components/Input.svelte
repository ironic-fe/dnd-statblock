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
  export let step = null;
  export let hidden = false;
</script>

<label {hidden}>
  <slot name="beforeLabel" />
  <span>{label}:</span>
  <slot name="beforeInput" />
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
      {step}
    />
  {/if}
  <slot name="afterInput" />
</label>

<style>
  label > span {
    display: block;
  }
</style>
