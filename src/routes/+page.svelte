<script lang="ts">
    import Logo from "../components/Logo.svelte";
    import AddTable from "../components/AddTable.svelte";
    import Generate from "../components/Generate.svelte";
</script>
    <Logo/>
  <div class="flex justify-end mr-5">

    <AddTable/>
    <Generate/>

  </div>
  
  <style lang="postcss">
    :global(html) {
      background-color: theme(colors.gray.100);
    }
  </style>