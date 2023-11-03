
<!-- svelte-ignore a11y-click-events-have-key-events -->
<script lang="ts">
    import type { IColumnUI, ITable } from "../interfaces/base";
    import { storageService } from "../services/storageService";
    import { boardLeft,boardTop , toogleContainer} from "../services/board";
    import {  onMount } from "svelte";
    import { listTables, listTablesWithPr, listTablesWithRelation } from "../services/list";
    import { mainContainer } from "../services/board";
    import { details, detailsManager } from "../services/tableDetails";
    import { columnConstraints } from "../interfaces/enumsql";
    import TableSqlDetails from "./TableSqlDetails.svelte";
    export let model : ITable
    export let canvas : HTMLCanvasElement
    let tableStorage : ITable
    let service = new storageService();
    let modal : HTMLDialogElement
    let div : HTMLDivElement
    let cols : IColumnUI[] = []
    let x :number = 0;
    let y : number = 0;
    let isDragging = false;
    let hidden : string
    
    function Open()
    {
        modal.showModal();
    }
    function d(event:MouseEvent)
    {
        x = event.clientX - model.x;
        y = event.clientY - model.y;
        isDragging = true;
        div.addEventListener('mouseup',  u)
        div.addEventListener('mousemove',m)
        div.addEventListener("mouseleave", leave)
        event.stopImmediatePropagation()
       
    }

    function u(event:MouseEvent)
    {
      
      //x = event.clientX
		  //y = event.clientY
      
      isDragging = false
      
      //event.preventDefault()
      div.removeEventListener('mousemove',m)
      div.removeEventListener('mouseup',u)
      div.removeEventListener("mouseleave", leave)
      event.preventDefault()
      event.stopImmediatePropagation()
      event.stopPropagation()
      div.style.cursor = "grab";
      drawLines();
      
    }
    function leave()
    {
      isDragging = false;
    }

    function m(event:MouseEvent)
    {
      if (isDragging && (event.clientY - y) > $toogleContainer && (event.clientX-x) < ($boardLeft-model.w) && event.clientX > 100) {
        event.preventDefault()
        let ctx = canvas.getContext("2d");
        ctx?.reset(); // reset canvas
        //console.log(isDragging, "dragging")
        const dx = event.clientX - x;
        const dy = event.clientY - y;
        div.style.left = dx+ "px";
        div.style.top = dy+ "px";
        service.updateCoords(model.id,dx,dy);
        listTables.set(service.get());
        event.stopImmediatePropagation()
        event.stopPropagation()
        
      }
    }
    function down(e:MouseEvent)
    {
        isDragging = true;
        x = e.clientX - div.getBoundingClientRect().left;
        y = e.clientY - div.getBoundingClientRect().top;
        div.style.cursor = "grabbing"
    }

    function move(e:MouseEvent)
    {
      if (isDragging && (e.clientY - y) > 305 && (e.clientX-x) < ($boardLeft-model.w)) {
          let ctx = canvas.getContext("2d");
          ctx?.reset(); // reset canvas
          const newX = e.clientX - x;
          const newY = e.clientY - y;
          
          div.style.left = newX + "px";
          div.style.top = newY + "px";
          service.updateCoords(model.id,newX,newY);
          listTables.set(service.get()); // using svelte store to update the state
        }
    }

    function up()
    {
      isDragging = false;
      div.style.cursor = "grab";
      drawLines();
      //service.updateCoords(model.id,x,y);
    }
    function drawLines() : void
    {
      let h = 0;
      let h2 = 0;
      let ctx = canvas.getContext("2d");
      if(ctx != null)
      {
        ctx.strokeStyle = "#94a3b8"
        $listTablesWithRelation.forEach((tablePK, index1) => {
          
                  let table1 = service.getById(tablePK.tableIdPK);
                  let table2 = service.getById(tablePK.tablerIdFk);
                  h = table1.y > ($mainContainer+table1.h) ? table1.y - ($mainContainer+table1.h)  : ($mainContainer+table1.h) - table1.y
                  h2 = table2.y > ($mainContainer+table2.h) ? table2.y - ($mainContainer+table2.h)  : ($mainContainer+table2.h) - table2.y
                  const x1 =  table1.x + table1.w / 2;
                  
                  const y1 = h + table1.h  ;
                  const x2 = table2.x + table2.w / 2;
                  const y2 = h2 + table2.h  ;
                  //console.log(x1,y1,x2,y2)
                  //console.log(table1.x,table1.y)
                  ctx?.beginPath();
                  //ctx?.moveTo(table1.x, table1.y);
                  //ctx?.lineTo(table2.x, table2.y);
                  ctx?.moveTo(x1, y1);
                  ctx?.lineTo(x2, y2);
                  ctx?.stroke();
             
        });
      }
    }

    function generateRow(row : IColumnUI)
    {
      let pk = ""
      let defaultvalue = row.default.value.trim().length  != 0 ? `DEFAULT ${row.default.value}` : "";
    
        pk = `<pre><code>  ${row.columnName} ${row.type}${row.length != "" ? "("+row.length+")" : ""} ${defaultvalue}</code></pre>`
            
      return pk 
    }


    onMount(()=>
    {
      cols = model.colums
      hidden = $details ? "hidden" :""
      div.style.left = model.x  + "px";
      div.style.top = model.y + "px";
      service.updateDimensions(model.id,div.getBoundingClientRect().width,div.getBoundingClientRect().height) // Updating table dimensions
      listTables.set(service.get());
    });

    function deleteTableModal()
    {
      modal.show()
    }

    function deletaTableAction()
    {
      service.deleteTable(model)
      let ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      listTables.set(service.get())
      listTablesWithRelation.set(service.getTablesWithPRandFK())
      listTablesWithPr.set(service.getTablesWithPR());
      modal.close()
    }

</script>


<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore redundant-event-modifier -->
<div class="absolute cursor-grab w-72 max-w-sm bg-base-100 shadow-xl font-mono bg-neutral"
bind:this={div}
on:mousedown|stopPropagation={d}
>
  {#if $details}
    
    <div class="overflow-x-auto"> 
      <div class="text-center p-2 flex items-center justify-around">
        <p class="font-medium text-lg text-slate-200">{model.tableName}</p>
        <button class="btn btn-ghost" on:click={deleteTableModal}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
          </svg>
        </button>
        </div>  
          
          <table class="table">
            <!-- head -->
            <thead>
              <tr>
                
                <th></th>
                <th>Column Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {#if cols.length != 0}
                {#each cols as c, index} 
                <tr>
                  <td >{index}</td>
                  <td >{c.columnName}</td>
                  <td >{c.type}</td>
                </tr> 
                {/each}
              {/if}
            </tbody>
          </table>
        
  </div>
    {:else}
    <div class="card-body">
      <div>
        <h1 class="text-center text-lg">{model.tableName}</h1>
      </div>
      <div class="card-actions justify-end">
        <button class="btn btn-ghost" on:click={deleteTableModal}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
          </svg>
        </button>
      </div>
    </div>
  {/if}

</div>

<dialog id="my_modal_1" class="modal" bind:this={modal}>
  <div class="modal-box">
    <h3 class="font-bold text-lg">Delete</h3>
    <p class="py-4">Are you sure to delete this table?</p>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn btn-active btn-primary" on:click|preventDefault={deletaTableAction}>Delete</button>
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
