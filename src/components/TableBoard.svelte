<script lang="ts">
    import type { ITable } from "../interfaces/base";
    import { writable } from "svelte/store";
    import Tablesql from "./Tablesql.svelte";
    import { storageService } from "../services/storageService";
    import { listTables } from "../services/list";
    import { onMount } from "svelte";
    const service = new storageService()
    let divContainer : HTMLDivElement
    let canvas : HTMLCanvasElement
    let w :number;
    let h : number;
    
    function loadTables() : ITable[]
    {
        const service = new storageService()
        return service.get()
    }

    function click()
    {
        let ctx = canvas.getContext("2d");
        
        ctx?.beginPath();
        ctx?.moveTo(0,0);
        ctx?.lineTo(20,100);
        ctx?.stroke();
    }
    
    onMount(() =>
    {
        w = divContainer.getBoundingClientRect().width
        h = divContainer.getBoundingClientRect().height
    })

   addEventListener("resize",()=>
   {
        w = divContainer.getBoundingClientRect().width
        h = divContainer.getBoundingClientRect().height
   }
    )


</script>


<div class="w-full mt-2 overflow-hidden bg-slate-700 h-screen" bind:this={divContainer}> 
    <canvas id="canvas" class="absolute" width="{w}px" height="{h}px" bind:this={canvas} on:click={click}>
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