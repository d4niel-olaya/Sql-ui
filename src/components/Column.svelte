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
    
    <input type="text" placeholder="id" class="input input-bordered max-w-xs" bind:value={columnData.type} />
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
    
    <input type="text" placeholder="id" class="input input-bordered max-w-xs" bind:value={columnData.constraint}/>
</div>
