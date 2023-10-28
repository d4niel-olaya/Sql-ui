<script lang="ts">
    import type { IColumnUI, IPk } from "../interfaces/base";
    import { columnConstraints, columnTypes } from "../interfaces/enumsql";
    import { storageService } from "../services/storageService";
    import { listTablesWithPr } from "../services/list";
    export let columnData : IColumnUI 
    export let labels : boolean;
    let service = new storageService();
    let selectDefault : HTMLSelectElement
    let selectPK : HTMLSelectElement
    let widthConstraint = "max-w-xs w-screen"
    let widthDefault = "max-w-xs"
    let tablePk = 0;
    function changeWidth()
    {
        if(columnData.type == columnTypes.VARCHAR)
        {
           // widthConstraint = "w-3/4"
           columnData.length = "100"
           widthConstraint = "w-full"
           widthDefault = "w-full"
        }else{
            widthConstraint = "max-w-xs w-screen"
            widthDefault = "max-w-xs"
        }
    }
    function isCustomSelected() : boolean
    {
        return columnData.default.value == "Custom"
    }
    function changeDefault()
    {
        if(selectDefault.value == "Custom")
        {
            columnData.default.custom = true;
            columnData.default.value = "";
        }else{
            columnData.default.custom = false;
            if(selectDefault.value == "CURRENT_TIMESTAMP")
            {
                columnData.default.value = selectDefault.value;
            }else{
                columnData.default.value = "";
            }
        }
    }

    function onchangePk()
    {
        let t = service.getTablesWithPR().filter(tp => tp.tableId == columnData.fk)[0].columnId
        columnData.pk_fk = {columnFKId : columnData.id, tableIdPK :columnData.fk , columnPKId : t, columnNameFk:columnData.columnName}
    }
</script>
 

    <div>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        
        <label class="label">
            <span class="label-text">{labels == true ? "colunm name" : ""}</span>
        </label>
        
        <input type="text" placeholder="id" class="input input-bordered max-w-xs" bind:value={columnData.columnName} minlength="1" required/>
    </div>
    <div>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        
        <label class="label">
            <span class="label-text">{labels ? "type" : ""}</span>
        </label>
        <select class="select select-bordered max-w-xs" bind:value={columnData.type} on:change={changeWidth}>
            <option value="{columnTypes.INT}" class="option">{columnTypes.INT}</option>
            <option value="{columnTypes.BIGINT}" class="option">{columnTypes.BIGINT}</option>
            <option value="{columnTypes.VARCHAR}" class="option">{columnTypes.VARCHAR}</option>
            <option value="{columnTypes.DATE}" class="option">{columnTypes.DATE}</option>
            <option value="{columnTypes.FLOAT}" class="option">{columnTypes.FLOAT}</option>
            <option value="{columnTypes.BOOLEAN}" class="option">{columnTypes.BOOLEAN}</option>
            <option value="{columnTypes.TEXT}" class="option">{columnTypes.TEXT}</option>
            <option value="{columnTypes.DECIMAL}" class="option">{columnTypes.DECIMAL}</option>
            <option value="{columnTypes.CHAR}" class="option">{columnTypes.CHAR}</option>
          </select>
        
          {#if columnData.type == columnTypes.VARCHAR}
            
                  <!-- svelte-ignore a11y-label-has-associated-control -->
                  <label class="label">
                      <span class="label-text">{labels ? "length" : ""}</span>
                  </label>
                  <input type="number" class="input input-bordered w-auto" bind:value={columnData.length} min="1" max="255">
              
          {/if}
    </div>
    <div>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        
        <label class="label">
            <span class="label-text">{labels ? "default" : ""}</span>
        </label>
        <select class="select select-bordered max-w-xs" bind:this={selectDefault} on:change={changeDefault}>
            <option value="None" class="option">None</option>
            <option value="Custom" class="option">Custom</option>
            <option value="CURRENT_TIMESTAMP" class="option">CURRENT_TIMESTAMP</option>
        </select>
        {#if columnData.default.custom}
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label class="label">
                <span class="label-text">Value</span>
            </label>
            <input type="text" placeholder="id" class="input input-bordered w-auto" bind:value={columnData.default.value}/>
        {/if}
    </div>
    <div>
        <!-- svelte-ignore a11y-label-has-associated-control -->
       
        <label class="label">
            <span class="label-text">{labels ? "constraint" : ""}</span>
        </label>
        <select class="select select-bordered {widthConstraint}" bind:value={columnData.constraint}>
            <option value="{columnConstraints.PRIMARY_KEY}" class="option">{columnConstraints.PRIMARY_KEY}</option>
            <option value="{columnConstraints.PRIMARY_KEY_AI}" class="option">{columnConstraints.PRIMARY_KEY_AI}</option>
            <option value="{columnConstraints.FOREIGN_KEY}" class="option">{columnConstraints.FOREIGN_KEY}</option>
            <option value="{columnConstraints.NULL}" class="option">{columnConstraints.NULL}</option>
            <option value="{columnConstraints.NOT_NULL}" class="option">{columnConstraints.NOT_NULL}</option>
            <option value="{columnConstraints.UNIQUE}" class="option">{columnConstraints.UNIQUE}</option>
          </select>
        {#if columnData.constraint == columnConstraints.FOREIGN_KEY}
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label class="label">
                <span class="label-text">Select Primary key</span>
            </label>
            <select class="select select-bordered {widthConstraint}" bind:value={columnData.fk} on:change={onchangePk}>
            {#each  $listTablesWithPr as t }
                <option value="{t.tableId}" class="option">{service.getNameAndColumn(t.tableId,t.columnId)}</option>
            {/each}
            </select>
        {/if}
    </div>

