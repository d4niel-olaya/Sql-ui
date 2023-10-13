<script lang="ts">
    import Logo from "../components/Logo.svelte";
    import AddTable from "../components/AddTable.svelte";
    import Generate from "../components/Generate.svelte";
    import Provider from "../components/Provider.svelte";
    import CodeResult from "../components/CodeResult.svelte";
    import TableBoard from "../components/TableBoard.svelte";
    import Tablesql from "../components/Tablesql.svelte";

    let showModal = false;
</script>
    <Logo/>
  <div class="flex justify-around mr-10 mt-5">
    <CodeResult/>
    <div class="flex flex-col items-center">
        <AddTable/>
        <Provider/>
        <Generate/>
    </div>
  </div>
      <Tablesql name={"example"} />
     
      <TableBoard/>

    
  
  
  <style lang="postcss">
    :global(html) {
      background-color: theme(colors.gray.100);
    }
  </style>