<script>
  async function getPresets() {
    const url = "https://api.open5e.com/monsters/?format=json&fields=slug,name&limit=1000&document__slug=wotc-srd";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      if (json?.count && Array.isArray(json.results)) {
        return json.results;
      }
    } catch (error) {
      console.error(error.message);
    }

    return [];
  }
</script>

<select id="monster-select">
  {#await getPresets() then presets} 
    {#each presets as option}
      <option value={option.slug}>{option.name}</option>
    {/each}
  {/await}
</select>