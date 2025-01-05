<script>
  import {statblockStore} from "./statblock";
  import Controller from "./Controller.svelte";
  import { setContext } from "svelte";

  const statblock = statblockStore();

  setContext('statblock', statblock);
</script>

<Controller />