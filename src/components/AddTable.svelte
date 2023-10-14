
<script  lang="ts">
    let modal : HTMLDialogElement
    function Open()
    {
        modal.showModal();
    }
</script>

    <div class="m-1 mr-14">
        <button class="btn btn-primary font-mono" on:click={Open}>
            <div class="flex items-center">
                <div class="mr-2">
                    <svg width="12px" height="12px" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M12 5v14m-7-7h14"></path></svg>
                </div>
                <span> New</span>
            </div>
        </button>
        
    </div>

    <dialog class="modal" bind:this={modal}>
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


