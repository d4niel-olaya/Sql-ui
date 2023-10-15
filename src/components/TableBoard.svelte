<script lang="ts">
        import type { ITable } from "../interfaces/base";
    import { storageService } from "../services/storageService";
    import Tablesql from "./Tablesql.svelte";
   const service = new storageService();
</script>


<div class="w-full mt-2 overflow-hidden bg-slate-700 h-screen"> 
    {#if service.get().length > 0}
    {#each service.get() as table}
        <Tablesql model={table}/>
    {/each}
{/if}
</div>