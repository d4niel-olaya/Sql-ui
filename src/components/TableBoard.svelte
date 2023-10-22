<script lang="ts">
    import type { ITable } from "../interfaces/base";
    import { writable } from "svelte/store";
    import Tablesql from "./Tablesql.svelte";
    import { storageService } from "../services/storageService";
    import { listTables } from "../services/list";
    import { boardLeft,boardTop } from "../services/board";
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
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        $listTables.forEach(table => {
           // ctx?.fillStyle = table.isDragging ? 'red' : 'blue';
            ctx?.fillRect(table.x, table.y, table.w, table.h);
        });
       $listTables.forEach((table1, index1) => {
            $listTables.forEach((table2, index2) => {
            if (index1 !== index2) {
                const x1 = (305- table1.x) + table1.w / 2 ;
                
                const y1 = table1.y + table1.h / 2;
                const x2 = (305-table2.x) + table2.w  / 2;
                const y2 = table2.y + table2.h / 2 ;
                console.log(x1,y1,x2,y2)
                console.log(table1.x,table1.y)
                ctx?.beginPath();
                ctx?.moveTo(table1.x, table1.y);
                ctx?.lineTo(table2.x, table2.y);
                ctx?.stroke();
            }
            });
      });
      /*
      const x1 = 644 + 288 / 2 ;
                
        const y1 = 382 + 96 / 2;
        const x2 = 350 + 288  / 2;
        const y2 = 795 + 96 / 2 ;
        ctx?.beginPath();
        ctx?.moveTo((288/2), ((330-96) / 96));
        ctx?.lineTo((288/2),795+96);
        ctx?.stroke();*/
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
        canvas.width = w;
        canvas.height =h
        boardLeft.set(divContainer.getBoundingClientRect().width);
        //boardTop.set(divContainer.getBoundingClientRect().height);
    }


</script>


<div class="w-full mt-2 overflow-hidden bg-slate-700 h-screen" bind:this={divContainer}> 
    <canvas id="canvas" class="absolute" bind:this={canvas} >
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