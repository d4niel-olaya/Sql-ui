
<!-- svelte-ignore a11y-click-events-have-key-events -->
<script lang="ts">
    import type { IColumnUI, ITable } from "../interfaces/base";
    import { storageService } from "../services/storageService";
    import { onMount } from "svelte";
    import { listTables } from "../services/list";
    export let model : ITable
    let tableStorage : ITable
    let service = new storageService();
    let modal : HTMLDialogElement
    let div : HTMLDivElement
    let x :number = 0;
    let y : number = 0;
    let isDragging = false;
    
    function Open()
    {
        modal.showModal();
    }

    function down(e:MouseEvent)
    {
        isDragging = true;
        console.log(div.getBoundingClientRect().top)
        x = e.clientX - div.getBoundingClientRect().left;
        y = e.clientY - div.getBoundingClientRect().top;
        div.style.cursor = "grabbing"
    }

    function move(e:MouseEvent)
    {
      if (isDragging && (e.clientY - y) > 305) {
        console.log(isDragging)
          const newX = e.clientX - x;
          const newY = e.clientY - y;
          console.log(newY)
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
      //service.updateCoords(model.id,x,y);
    }


    onMount(()=>
    {
      div.style.left = model.x + "px";
      div.style.top = model.y + "px";
    });
    



</script>


<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="absolute cursor-grab card w-70 bg-base-100 shadow-xl font-mono  border-2 border-slate-400"

bind:this={div}
on:mousedown={down}
on:mousemove={move}
on:mouseup={up}
>
    <div class="card-body">
      <h2 class="card-title">{model.tableName}</h2>
    </div>
</div>

<dialog id="my_modal_1" class="modal" bind:this={modal}>
  <div class="modal-box">
    <h3 class="font-bold text-lg">Hello!</h3>
    <p class="py-4">Press ESC key or click the button below to close</p>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
