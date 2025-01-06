<script>
  import { getContext } from "svelte";
  import Input from "./Input.svelte";
  import { armorTypes } from "../constants";

  const statblock = getContext("statblock");
</script>

<table id="armor-hitdice-form">
  <tr>
    <td></td>
    <td>
      <Input
        name="hitDice"
        label="Hit Dice"
        type="number"
        min="1"
        max="99"
        hidden={$statblock.customHP}
      />
      <Input name="hpText" label="Hit Points" hidden={!$statblock.customHP} />
      <div class="box-note">
        <label>
          <span>(Custom HP:</span>
          <input
            type="checkbox"
            on:change={(e) => ($statblock.customHP = e.target.checked)}
          />
          <span>)</span>
        </label>
      </div>
    </td>
    <td>
      <Input
        name="armorName"
        label="Armor Type"
        type="select"
        options={armorTypes}
      />
      <div class="box-note">
        <label>
          <span>(Shield:</span>
          <input
            type="checkbox"
            checked={$statblock.shieldBonus > 0}
            on:change={(e) =>
              ($statblock.shieldBonus = e.target.checked ? 2 : 0)}
          />
          <span>)</span>
        </label>
      </div>
    </td>
    <td colspan="2">
      <Input
        name="natArmorBonus"
        label="Natural Armor Bonus"
        type="number"
        min="1"
        max="99"
        hidden={$statblock.armorName != "natural armor"}
      />
      <Input
        name="otherArmorDesc"
        label="Description"
        hidden={$statblock.armorName != "other"}
      >
        <div class="box-note" slot="afterInput">
          <i>Use _ to italicize</i>
        </div>
      </Input>
    </td>
  </tr>
</table>
