<script lang="ts">
    import type { IColumnUI } from "../interfaces/columns";
    export let columnData : IColumnUI 
   
</script>

<div>
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="label">
        <span class="label-text">column name</span>
    </label>
    <input type="text" placeholder="id" class="input input-bordered max-w-xs" bind:value={columnData.columnName} />
</div>
<div>
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="label">
        <span class="label-text">type</span>
    </label>
    <input type="text" placeholder="id" class="input input-bordered max-w-xs" bind:value={columnData.type} />
</div>
<div>
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="label">
        <span class="label-text">default</span>
    </label>
    <input type="text" placeholder="id" class="input input-bordered max-w-xs" bind:value={columnData.default}/>
</div>
<div>
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="label">
        <span class="label-text">constraints</span>
    </label>
    <input type="text" placeholder="id" class="input input-bordered max-w-xs" bind:value={columnData.constraint}/>
</div>