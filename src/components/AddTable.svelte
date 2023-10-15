
<script  lang="ts">
    import type { IColumnUI } from "../interfaces/columns";
    import Column from "./Column.svelte";
    let modal : HTMLDialogElement
    let columns : IColumnUI[] =[
        {
            columnName:"",
            type:"",
            constraint:"",
            default:""
        }
    ]
    
    function Open()
    {
        modal.showModal();
    }

    function addColumn()
    {
        columns = columns.concat({
            columnName:"",
            type:"a",
            constraint : "",
            default : ""
        });
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
            <div class="modal-box w-11/12 max-w-5xl">
                <div class="form-control">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label class="label">
                        <span class="label-text">Table name</span>
                    </label>
                    <input type="text" placeholder="MyTable" class="input input-bordered w-full max-w-xs" />
                    <div class="flex flex-wrap flex-row justify-around w-full">
                        <!-- svelte-ignore empty-block -->
                        {#each columns as column}
                            <Column columnData ={column}/>
                        {/each}
                    </div>
                    <div class="w-1/6 p-4">
                        <button class="btn btn-primary" on:click={addColumn}>Add Column</button>
                    </div>
                </div>
              <div class="modal-action">
                <form method="dialog">
                  <button class="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
   


