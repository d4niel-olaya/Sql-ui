<script lang="ts">
    import type { ITable } from "../interfaces/base";
    import { writable } from "svelte/store";
    import Tablesql from "./Tablesql.svelte";
    import { storageService } from "../services/storageService";
    import { listTables } from "../services/list";
    const service = new storageService()
    function loadTables() : ITable[]
    {
        const service = new storageService()
        return service.get()
    }
    
</script>



<div class="w-full mt-2 overflow-hidden bg-slate-700 h-screen"> 
    {#if $listTables.length > 0}
        {#each $listTables as table}
            <Tablesql model={table}/>
        {/each}
    {/if}
</div>