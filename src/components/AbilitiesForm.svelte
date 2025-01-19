<script>
  import { getContext } from "svelte";
  import { bonusFormat } from "../helpers/formatHelpers";
  import { pointsToBonus } from "../helpers/statHelpers";
  import Input from "./Input.svelte";

  const statblock = getContext("statblock");
</script>

<table id="monster-stats-form">
  <tr>
    {#each ["str", "dex", "con", "int", "wis", "cha"] as ability}
      {@const name = ability + "Points"}
      {@const label = ability.toLocaleUpperCase()}
      <td>
        <Input {name} {label} type="number" min="1" max="40">
          <span slot="afterInput">
            ({bonusFormat(pointsToBonus($statblock[name]))})
          </span>
        </Input>
      </td>
    {/each}
  </tr>
</table>
