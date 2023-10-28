<script lang="ts">
    import type { ITable } from "../interfaces/base";
    import { writable } from "svelte/store";
    import Tablesql from "./Tablesql.svelte";
    import { storageService } from "../services/storageService";
    import { listTables, listTablesWithPr } from "../services/list";
    import { boardLeft,toogleContainer,mainContainer} from "../services/board";
    import { dimensionService } from "../services/dimensionService";
    import { onMount } from "svelte";
    let service = new storageService()
    let toogle : HTMLDivElement
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
        if(ctx != null)
        {

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = "#94a3b8"
            let h=0;
            let h2 = 0
            /*$listTables.forEach(table => {
                h = table.y > ($mainContainer+table.h) ? table.y - ($mainContainer+table.h)  : ($mainContainer+table.h) - table.y
                console.log(h, "main")
                console.log(table.y)
               // ctx?.fillStyle = table.isDragging ? 'red' : 'blue';
                ctx?.fillRect(table.x, h, table.w, table.h);
            });*/
            $listTablesWithPr.forEach((index1) => {
                $listTablesWithPr.forEach((index2) => {
                if (index1 !== index2) {
                    let table1 = service.getById(index1);
                    let table2 = service.getById(index2);
                    h = table1.y > ($mainContainer+table1.h) ? table1.y - ($mainContainer+table1.h)  : ($mainContainer+table1.h) - table1.y
                    h2 = table2.y > ($mainContainer+table2.h) ? table2.y - ($mainContainer+table2.h)  : ($mainContainer+table2.h) - table2.y
                    const x1 =  table1.x + table1.w / 2 ;
                    
                    const y1 = h + table1.h / 2;
                    const x2 = table2.x + table2.w  / 2;
                    const y2 = h2 + table2.h / 2 ;
                    console.log(x1,y1,x2,y2)
                    console.log(table1.x,table1.y)
                    
                    ctx?.beginPath();
                    //ctx?.moveTo(table1.x, table1.y);
                    //ctx?.lineTo(table2.x, table2.y);
                    ctx?.moveTo(x1, y1);
                    ctx?.lineTo(x2, y2);
                    ctx?.stroke();
                }
                });
          });
        }
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
        const service = new dimensionService();
        service.setToggleDimension(toogle.getBoundingClientRect().y)
        toogleContainer.set(toogle.getBoundingClientRect().y)
        setDimensions();
        click()
    })

   addEventListener("resize",()=>
   {
        setDimensions();
   }
    )

    function setDimensions() : void
    {
        const dService = new dimensionService()
        const service = new storageService()
        w = divContainer.getBoundingClientRect().width
        h = divContainer.getBoundingClientRect().height
        canvas.width = w;
        canvas.height =h
        dService.setDimension(w);
        $listTables.forEach((table,index) =>{
            if(table.x > $boardLeft)
            {
                service.updateCoords(table.id,$boardLeft - 288,table.y);
            }
        })
        boardLeft.set(dService.getDimension())
        listTables.set(service.get())
    
        //boardTop.set(divContainer.getBoundingClientRect().height);
    }


</script>

<div class="w-full mt-2 overflow-hidden bg-slate-700 h-screen" bind:this={divContainer}> 
    <canvas id="canvas" class="absolute" bind:this={canvas} >
      </canvas>
    <div class="absolute form-control w-44" bind:this={toogle}>
        <label class="cursor-pointer label">
            <input type="checkbox" class="toggle toggle-primary" checked disabled/>
            <span class="label-text">Show table details</span> 
        </label>
      </div>
    {#if $listTables.length > 0}
        {#each $listTables as table}
            <Tablesql model={table} canvas={canvas}/>
        {/each}
    {/if}
</div>