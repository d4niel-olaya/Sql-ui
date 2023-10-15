<script lang="ts">
    import Logo from "../components/Logo.svelte";
    import AddTable from "../components/AddTable.svelte";
    import Generate from "../components/Generate.svelte";
    import Provider from "../components/Provider.svelte";
    import CodeResult from "../components/CodeResult.svelte";
    import TableBoard from "../components/TableBoard.svelte";
    import Tablesql from "../components/Tablesql.svelte";
    import arrowsql from "$lib/assets/arrowsql.svg";
    
   
</script>
    <Logo/>
  <div class="flex flex-wrap justify-around mt-5 w-screen">
    <CodeResult/>
    <div class="flex flex-col items-center">
        <AddTable/>
        <Provider/>
        <Generate/>
    </div>
  </div>
     
      <TableBoard/>

    
  
  
  <style lang="postcss">
    :global(html) {
      background-color: theme(colors.gray.100);
    }
  </style>