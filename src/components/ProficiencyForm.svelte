<script>
  import { getContext } from "svelte";
  import { abilityScores } from "../constants";

  const statblock = getContext("statblock");

  let selection = $state();
</script>

<div>
  <label>
    <span>Saving Throws:</span>
    <select bind:value={selection}>
      {#each abilityScores as ability}
        <option value={ability.value}>{ability.label}</option>
      {/each}
    </select>
  </label>
  <button
    type="button"
    onclick={() => {
      if (selection && !$statblock.sthrows[selection]) {
        $statblock.sthrows[selection] = 1;
      }
    }}
  >
    Proficient
  </button>
  <div id="sthrows-input-section">
    <ul id="sthrows-input-list" class="statblock-list">
      {#each Object.keys($statblock.sthrows) as value}
        <li>
          <button
            onclick={() => delete $statblock.sthrows[value]}
            title="remove"
            type="button"
          >
            <span>✗</span>
          </button>
          {value.toLocaleUpperCase()}
        </li>
      {/each}
    </ul>
  </div>
</div>
<div id="skills-form">
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
  <button type="button" data-onclick="InputFunctions.AddSkillInput()">
    Proficient
  </button>
  <button type="button" data-onclick="InputFunctions.AddSkillInput(' (ex)')">
    Expert
  </button>
  <div id="skills-input-section">
    <ul id="skills-input-list" class="statblock-list"></ul>
  </div>
</div>
