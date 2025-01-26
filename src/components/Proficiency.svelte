<script>
  import { getContext } from "svelte";
  import { abilityScores } from "../constants";
  import Input from "./Input.svelte";

  const statblock = getContext("statblock");

  let selection;
</script>

<td>
  <label>
    <span>Saving Throws:</span>
    <select bind:value={selection}>
      {#each abilityScores as ability}
        <option value={ability.shortLabel}>{ability.label}</option>
      {/each}
    </select>
  </label>
  <button
    type="button"
    on:click|preventDefault={() => {
      console.log($statblock.sthrows);
      if (selection && !$statblock.sthrows[selection]) {
        $statblock.sthrows = [...$statblock.sthrows][selection] = 1;
      }
    }}
  >
    Proficient
  </button>
  <div id="sthrows-input-section">
    <ul id="sthrows-input-list" class="statblock-list"></ul>
  </div>
</td>
<td id="skills-form">
  <label for="skills-input">Skills:</label>
  <br />
  <select id="skills-input">
    <option value="acrobatics">Acrobatics</option>
    <option value="animal Handling">Animal Handling</option>
    <option value="arcana">Arcana</option>
    <option value="athletics">Athletics</option>
    <option value="deception">Deception</option>
    <option value="history">History</option>
    <option value="insight">Insight</option>
    <option value="intimidation">Intimidation</option>
    <option value="investigation">Investigation</option>
    <option value="medicine">Medicine</option>
    <option value="nature">Nature</option>
    <option value="perception">Perception</option>
    <option value="performance">Performance</option>
    <option value="persuasion">Persuasion</option>
    <option value="religion">Religion</option>
    <option value="sleight of Hand">Sleight of Hand</option>
    <option value="stealth">Stealth</option>
    <option value="survival">Survival</option>
  </select>
  <button type="button" onclick="InputFunctions.AddSkillInput()">
    Proficient
  </button>
  <button type="button" onclick="InputFunctions.AddSkillInput(' (ex)')">
    Expert
  </button>
  <div id="skills-input-section">
    <ul id="skills-input-list" class="statblock-list"></ul>
  </div>
</td>
