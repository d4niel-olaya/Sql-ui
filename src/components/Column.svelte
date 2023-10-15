<script lang="ts">
    import type { IColumnUI } from "../interfaces/columns";
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
            <option value="text" class="option">text</option>
            <option value="integer" class="option">integer</option>
            <option value="real" class="option" >real</option>
            <option value="boolean" class="option">boolean</option>
            <option value="character" class="option">character</option>
            <option value="date" class="option">date</option>
            <option value="json" class="option">json</option>
            <option value="serial" class="option">serial</option>
          </select>
        
    </div>
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
            <option value="primary-key">Primary Key</option>
            <option value="not-null">Not Null</option>
            <option value="unique">Unique</option>
          </select>
        
    </div>

