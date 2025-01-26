<script>
  import { getContext } from "svelte";
  import { sizes, types } from "../constants";
  import Input from "./Input.svelte";

  const statblock = getContext("statblock");
</script>

<div class="group" id="type-form">
  <div class="row">
    <div>
      <Input name="name" label="Name" />
    </div>
    <div>
      <Input name="size" label="Size" type="select" options={sizes} />
    </div>
    <div>
      <Input name="type" label="Type" type="select" options={types} />
      <div>
        <input
          hidden={$statblock.type !== "*"}
          type="text"
          value={$statblock.otherType}
          name="otherType"
          on:change={(e) => ($statblock.otherType = e.target.value)}
        />
      </div>
    </div>
    <div>
      <Input name="tag" label="Tag" />
    </div>
    <div>
      <Input name="alignment" label="Alignment" />
    </div>
  </div>
</div>
