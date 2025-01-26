<script>
  import { getContext } from "svelte";
  import { open5eApi } from "../constants";
  import { processOpen5ePreset } from "../statblock";

  const statblock = getContext("statblock");

  async function getMonsterPresets() {
    const apiParams = new URLSearchParams({
      format: "json",
      fields: "slug,name",
      limit: "400",
      document__slug: "wotc-srd",
    });
    const url = open5eApi + "monsters/?" + apiParams.toString();
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`Get monster presets error: ${response.status}`);
      }

      const json = await response.json();
      if (json?.count && Array.isArray(json.results)) {
        return json.results;
      }
    } catch (error) {
      console.error(`Get monster presets error: ${error.message}`);
    }

    return [];
  }

  async function getMonster(slug) {
    const url = open5eApi + "monsters/" + slug;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`Get monster error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Get monster error: ${error.message}`);
    }
  }

  async function useMonsterPreset(slug) {
    let monster = await getMonster(slug);
    if (monster) {
      statblock.set(processOpen5ePreset(monster));
      // GetVariablesFunctions.SetPreset(jsonArr);
      // FormFunctions.SetForms();
      // UpdateStatblock();
    }
  }

  let presetSelect = $state();
</script>

<div id="monster-select-form">
  <span>Monster Presets:</span>
  <select bind:value={presetSelect}>
    <option></option>
    {#await getMonsterPresets() then presets}
      {#each presets as option}
        <option value={option.slug}>{option.name}</option>
      {/each}
    {/await}
  </select>
  <button
    type="button"
    onclick={() => {
      if (presetSelect) useMonsterPreset(presetSelect);
    }}
  >
    <span>Use Preset</span>
  </button>
  <button type="button" onclick={() => statblock.reset()}>
    <span>Restore Default</span>
  </button>
</div>
