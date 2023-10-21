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
        
        $listTables.forEach((table1, index1) => {
            $listTables.forEach((table2, index2) => {
            if (index1 !== index2) {
                const x1 = table1.x + table1.w / 2 ;
                
                const y1 = table1.y + table1.h / 2;
                const x2 = table2.x + table2.w  / 2;
                const y2 = table2.y + table2.h / 2 ;
                console.log(x1,y1,x2,y2)
                console.log(table1.x,table1.y)
                ctx?.beginPath();
                ctx?.moveTo(x1, y1);
                ctx?.lineTo(x2, y2);
                ctx?.stroke();
            }
            });
      });
    }
    
    onMount(() =>
    {
        setDimensions();
    })

   addEventListener("resize",()=>
   {
        setDimensions();
   }
    )

    function setDimensions() : void
    {
        w = divContainer.getBoundingClientRect().width
        h = divContainer.getBoundingClientRect().height
    }


</script>


<div class="w-full mt-2 overflow-hidden bg-slate-700 h-screen" bind:this={divContainer}> 
    <canvas id="canvas" class="absolute" width="{w}px" height="{h}px" bind:this={canvas} >
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