<script lang="ts">
    import type { IColumnUI } from "../interfaces/base";
    import { columnConstraints, columnTypes } from "../interfaces/enumsql";
    export let columnData : IColumnUI 
    export let labels : boolean;
</script>
 

    <div>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        
        <label class="label">
            <span class="label-text">{labels == true ? "colunm name" : ""}</span>
        </label>
        
        <input type="text" placeholder="id" class="input input-bordered max-w-xs" bind:value={columnData.columnName} />
    </div>
    <div>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        
        <label class="label">
            <span class="label-text">{labels ? "type" : ""}</span>
        </label>
        <select class="select select-bordered max-w-xs" bind:value={columnData.type} >
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
        
    </div>
    {#if columnData.type == columnTypes.VARCHAR}
        <div>
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label class="label">
                <span class="label-text">{labels ? "length" : ""}</span>
            </label>
            <input type="number" class="input input-bordered max-w-xs" bind:value={columnData.length} min="1" max="255">
        </div>
    {/if}
    <div>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        
        <label class="label">
            <span class="label-text">{labels ? "default" : ""}</span>
        </label>
        
        <input type="text" placeholder="id" class="input input-bordered max-w-xs" bind:value={columnData.default}/>
    </div>
    <div>
        <!-- svelte-ignore a11y-label-has-associated-control -->
       
        <label class="label">
            <span class="label-text">{labels ? "constraint" : ""}</span>
        </label>
        <select class="select select-bordered max-w-xs w-screen" bind:value={columnData.constraint}>
            <option value="{columnConstraints.PRIMARY_KEY}">{columnConstraints.PRIMARY_KEY}</option>
            <option value="{columnConstraints.FOREIGN_KEY}">{columnConstraints.FOREIGN_KEY}</option>
            <option value="{columnConstraints.NOT_NULL}">{columnConstraints.NOT_NULL}</option>
            <option value="{columnConstraints.NULL}">{columnConstraints.NULL}</option>
            <option value="{columnConstraints.UNIQUE}">{columnConstraints.UNIQUE}</option>
          </select>
        
    </div>

