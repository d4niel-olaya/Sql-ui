<script lang="ts">
    import Logo from "../components/Logo.svelte";
    import AddTable from "../components/AddTable.svelte";
    import Generate from "../components/Generate.svelte";
    import Provider from "../components/Provider.svelte";
</script>
    <Logo/>
  <div class="flex justify-end mr-10">
    <div class="flex flex-col items-center">

        <AddTable/>
        <Provider/>
        <Generate/>
    </div>
  </div>
  
  <style lang="postcss">
    :global(html) {
      background-color: theme(colors.gray.100);
    }
  </style>