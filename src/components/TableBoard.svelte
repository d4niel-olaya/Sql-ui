<script lang="ts">
    import type { ITable } from "../interfaces/base";
    import { writable } from "svelte/store";
    import Tablesql from "./Tablesql.svelte";
    import { storageService } from "../services/storageService";
    import { listTables } from "../services/list";
    const service = new storageService()
    let canvas : HTMLCanvasElement
    
    function loadTables() : ITable[]
    {
        const service = new storageService()
        return service.get()
    }

    function click()
    {
        let ctx = canvas.getContext("2d");
        ctx?.moveTo(10,10);
        ctx?.lineTo(180,180);
        ctx?.stroke();
    }
    
</script>


<div class="w-full mt-2 overflow-hidden bg-slate-700 h-screen"> 
    <canvas id="canvas" class="absolute w-full  h-screen" bind:this={canvas}>

      </canvas>
    <div class="absolute form-control w-44">
        <label class="cursor-pointer label">
            <input type="checkbox" class="toggle toggle-primary" checked disabled/>
            <span class="label-text">Show table details</span> 
        </label>
      </div>
    {#if $listTables.length > 0}
        {#each $listTables as table}
            <Tablesql model={table}/>
        {/each}
    {/if}
</div>