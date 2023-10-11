<script lang="ts">
    import AddTable from "../components/AddTable.svelte";
</script>

<h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
  <AddTable/>
  
  <style lang="postcss">
    :global(html) {
      background-color: theme(colors.gray.100);
    }
  </style>