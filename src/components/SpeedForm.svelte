<script>
  import { getContext } from "svelte";
  import Input from "./Input.svelte";

  const statblock = getContext("statblock");

  const speedTypes = [
    { name: "speed", label: "Speed" },
    { name: "burrowSpeed", label: "Burrow Speed" },
    { name: "climbSpeed", label: "Climb Speed" },
    { name: "swimSpeed", label: "Swim Speed" },
    { name: "flySpeed", label: "Fly Speed" },
  ];
</script>

<div class="group" id="monster-speed-form">
  <div class="row">
    {#each speedTypes as speedType}
      <div class="normal-speed-col" hidden={$statblock.customSpeed}>
        <Input
          name={speedType.name}
          label={speedType.label}
          type="number"
          min="0"
          max="995"
          step="5"
        >
          <span slot="afterInput">ft.</span>
        </Input>
        {#if speedType.name == "flySpeed"}
          <div id="hover-box-note" class="box-note">
            <label for="hover-input">
              (Hover: <input type="checkbox" id="hover-input" />
              )
            </label>
          </div>
        {/if}
      </div>
    {/each}
    <div colspan="5" class="custom-speed-col" hidden={!$statblock.customSpeed}>
      <Input name="speedDesc" label="Speed" />
      <br />
    </div>
    <div>
      <br />
      <div class="box-note">
        <label for="custom-speed-input">
          (Custom Speed: <input
            type="checkbox"
            checked={$statblock.customSpeed}
            onchange={(e) => ($statblock.customSpeed = e.target.checked)}
          />
          )
        </label>
      </div>
    </div>
  </div>
</div>
