<script>
  import { getContext } from "svelte";
  import { abilityScores } from "../constants";
  import { bonusFormat } from "../helpers/formatHelpers";
  import { pointsToBonus } from "../helpers/statHelpers";
  import Input from "./Input.svelte";

  const statblock = getContext("statblock");
</script>

<div class="group" id="monster-stats-form">
  <div class="row">
    {#each abilityScores as ability}
      {@const name = ability.value}
      {@const label = name.toLocaleUpperCase()}
      <div>
        <Input {name} {label} type="number" min="1" max="40">
          <span slot="afterInput">
            ({bonusFormat(pointsToBonus($statblock[name]))})
          </span>
        </Input>
      </div>
    {/each}
  </div>
</div>
