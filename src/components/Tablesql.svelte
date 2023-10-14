
<!-- svelte-ignore a11y-click-events-have-key-events -->
<script lang="ts">
    export let name : string;
    let modal : HTMLDialogElement
    function Open()
    {
        modal.showModal();
    }
</script>


<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="card w-96 bg-base-100 shadow-xl font-mono  border-2 border-slate-400"
on:click={Open}
>
    <div class="card-body">
      <h2 class="card-title">{name}</h2>
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
