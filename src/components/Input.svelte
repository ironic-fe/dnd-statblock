<script>
  import { getContext } from "svelte";

  const statblock = getContext("statblock");

  let input = $state();
  /**
   * @typedef {Object} Props
   * @property {any} name
   * @property {any} label
   * @property {string} [type]
   * @property {any} [options]
   * @property {any} [min]
   * @property {any} [max]
   * @property {any} [step]
   * @property {boolean} [hidden]
   * @property {import('svelte').Snippet} [beforeLabel]
   * @property {import('svelte').Snippet} [beforeInput]
   * @property {import('svelte').Snippet} [afterInput]
   */

  /** @type {Props} */
  let {
    name,
    label,
    type = "text",
    options = [],
    min = null,
    max = null,
    step = null,
    hidden = false,
    beforeLabel,
    beforeInput,
    afterInput
  } = $props();
</script>

<label {hidden}>
  {@render beforeLabel?.()}
  <span>{label}:</span>
  {@render beforeInput?.()}
  {#if type == "select"}
    <select
      {name}
      bind:this={input}
      value={$statblock[name]}
      onchange={() => ($statblock[name] = input.value)}
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
      onchange={() => ($statblock[name] = input.value)}
      {min}
      {max}
      {step}
    />
  {/if}
  {@render afterInput?.()}
</label>

<style>
  label > span {
    display: block;
  }
</style>
