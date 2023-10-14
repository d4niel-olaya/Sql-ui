
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
    

        <dialog class="modal" bind:this={modal} >
            <div class="modal-box">
                <div class="form-control w-full">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label class="label">
                        <span class="label-text">Table name</span>
                    </label>
                    <input type="text" placeholder="MyTable" class="input input-bordered w-full max-w-xs" />
                    <div class="flex flex-row w-full">
                        <!-- svelte-ignore a11y-label-has-associated-control -->
                        <div>
                            <label class="label">
                                <span class="label-text">column name</span>
                            </label>
                            <input type="text" placeholder="id" class="input input-bordered max-w-xs" />
                        </div>
                        <div>
                            <!-- svelte-ignore a11y-label-has-associated-control -->
                            <label class="label">
                                <span class="label-text">column name</span>
                            </label>
                            <input type="text" placeholder="id" class="input input-bordered max-w-xs" />
                        </div>
                        <div>
                            <!-- svelte-ignore a11y-label-has-associated-control -->
                            <label class="label">
                                <span class="label-text">column name</span>
                            </label>
                            <input type="text" placeholder="id" class="input input-bordered max-w-xs" />
                        </div>
                        <div>
                            <!-- svelte-ignore a11y-label-has-associated-control -->
                            <label class="label">
                                <span class="label-text">column name</span>
                            </label>
                            <input type="text" placeholder="id" class="input input-bordered max-w-xs" />
                        </div>
                    </div>
                </div>
              <div class="modal-action">
                <form method="dialog">
                  <button class="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
   


