<script>
  import { getContext } from "svelte";
  import { sizes, types } from "../constants";
  import Input from "./Input.svelte";

  const statblock = getContext("statblock");
</script>

<table id="type-form">
  <tr>
    <td>
      <Input name="name" label="Name" />
    </td>
    <td>
      <Input name="size" label="Size" type="select" options={sizes} />
    </td>
    <td>
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
    </td>
    <td>
      <Input name="tag" label="Tag" />
    </td>
    <td>
      <Input name="alignment" label="Alignment" />
    </td>
  </tr>
</table>
