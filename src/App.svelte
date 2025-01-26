<script>
  import { statblockStore } from "./statblock.svelte";
  import Controller from "./Controller.svelte";
  import { setContext } from "svelte";

  const statblock = statblockStore();

  setContext("statblock", statblock);
</script>

<Controller />
