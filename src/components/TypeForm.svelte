<script>
  import { getContext } from "svelte";

  const statblock = getContext("statblock");

  export let update;
</script>

<table id="type-form">
  <tr>
    <td>
      <label for="name-input">
        Name: <br />
        <input
          type="text"
          value={$statblock.name}
          name="name"
          on:change={update}
        />
      </label>
    </td>
    <td>
      <label for="size-input">
        Size: <br />
        <select
          id="size-input"
          value={$statblock.size}
          name="size"
          on:change={update}
        >
          <option value="tiny">Tiny</option>
          <option value="small">Small</option>
          <option value="medium" selected="selected">Medium</option>
          <option value="large">Large</option>
          <option value="huge">Huge</option>
          <option value="gargantuan">Gargantuan</option>
        </select>
      </label>
    </td>
    <td>
      <label for="type-input">
        Type: <br />
        <select
          id="type-input"
          value={$statblock.type}
          name="type"
          on:change={update}
        >
          <option value="aberration">Aberration</option>
          <option value="beast">Beast</option>
          <option value="celestial">Celestial</option>
          <option value="construct">Construct</option>
          <option value="dragon">Dragon</option>
          <option value="elemental">Elemental</option>
          <option value="fey">Fey</option>
          <option value="fiend">Fiend</option>
          <option value="giant">Giant</option>
          <option value="humanoid" selected>Humanoid</option>
          <option value="monstrosity">Monstrosity</option>
          <option value="ooze">Ooze</option>
          <option value="plant">Plant</option>
          <option value="undead">Undead</option>
          <option value="*">Other</option>
        </select>
      </label>
      <div>
        <input
          hidden={$statblock.type !== "*"}
          type="text"
          value={$statblock.otherType}
          name="otherType"
          on:change={update}
        />
      </div>
    </td>
    <td>
      <label for="tag-input">
        Tag: <br />
        <input
          id="tag-input"
          type="text"
          value={$statblock.tag}
          name="tag"
          on:change={update}
        />
      </label>
    </td>
    <td>
      <label for="alignment-input">
        Alignment: <br />
        <input
          id="alignment-input"
          type="text"
          value={$statblock.alignment}
          name="alignment"
          on:change={update}
        />
      </label>
    </td>
  </tr>
</table>
