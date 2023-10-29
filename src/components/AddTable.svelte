
<script  lang="ts">
    import type { IColumnUI, ITable } from "../interfaces/base";
    import { storageService } from "../services/storageService";
    import { toogleContainer} from "../services/board";
    import { helperValidate } from "../helpers/validateColumns";
    import Column from "./Column.svelte";
    import { listTables,listTablesWithPr,listTablesWithRelation } from "../services/list";
    import { dimensionService } from "../services/dimensionService";
    let modal : HTMLDialogElement
    let service = new storageService();
    let dService = new dimensionService();
    let showAlert = false
    let tables : ITable[];
    let columns : IColumnUI[] = []
    let newTable : ITable = {
        id: 0,
        tableName: "",
        colums: [],
        x:100,
        y:0,
        w:0,
        h:0
    }

    function Open()
    {
            columns = [
            {
                id:1,
                columnName:"",
                type:"text",
                constraint:"NULL",
                default:{custom:false, value:""},
                length:"",
                fk:0,
                pk_fk:{columnFKId:0,columnNameFk:"",columnPKId:0,tableIdPK:0}
            }
        ]
        tables = service.get(); //getting tables from localstorage
        modal.showModal();
        
        
    }

    function addColumn()
    {
        let idLast : IColumnUI = columns[columns.length -1];
        columns = columns.concat({
            id: (idLast.id + 1),
            columnName:"",
            type:"text",
            constraint : "NULL",
            default : {custom:false, value:""},
            length:"",
            fk:0,
            pk_fk:{columnFKId:0,columnNameFk:"",columnPKId:0,tableIdPK:0}
        });
    }

    function deleteColumn(columnDelete : IColumnUI)
    {
        columns = columns.filter(x => x.id != columnDelete.id);
    }


    function createTable()
    {   
        if(helperValidate.validateColunms(columns) || newTable.tableName.trim().length == 0)
        {
            showAlert = true
        }else{
            newTable.id = tables.length > 0 ? (tables[tables.length - 1].id + 1) : 1;
            newTable.y = $toogleContainer + 100
            newTable.colums = columns;
            service.create(newTable);
            service.loopTableWithPr(newTable);
            service.loopTableWithPrAndFk(newTable)
            listTables.set(service.get()); // updating state
            listTablesWithPr.set(service.getTablesWithPR()); // updating tables with PR Key
            listTablesWithRelation.set(service.getTablesWithPRandFK()); // tables with sql relationship
            newTable.tableName = "";
            modal.close();
            
        }
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
                    {#if showAlert}
                        <div class="alert alert-warning">
                            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            <span>Warning: Required Fields</span>
                        </div>
                    {/if}
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label class="label">
                        <span class="label-text">Table name</span>
                    </label>
                    <input type="text" placeholder="MyTable" class="input input-bordered w-full max-w-xs" bind:value={newTable.tableName}/>
                    <div class="flex flex-wrap flex-row justify-evenly items-center w-full">
                        <!-- svelte-ignore empty-block -->
                        {#if columns.length > 0}
                            {#each columns as column, i}
                                {#if i == 0}
                                    <Column columnData ={column} labels={true}/>
                                    
                                {:else}
                                    <Column columnData ={column} labels={false}/>
                                   
                                {/if}
                                {#if columns.length > 1}
                                <div class="self-center">
                                    <button class="btn btn-circle" on:click={x => deleteColumn(column)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>
                                {/if}
                            {/each}
                        {/if}
                    </div>
                    <div class="w-1/6 p-4">
                        <button class="btn btn-primary" on:click={addColumn}>Add Column</button>
                    </div>
                </div>
              <div class="modal-action">
                  <button class="btn btn-primary" on:click={createTable}>Create</button>
                <form method="dialog">
                  <button class="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
   


