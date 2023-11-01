<script lang="ts">
    import { onMount } from "svelte";
    import type { IColumnUI, ITable } from "../interfaces/base";
    import { columnConstraints } from "../interfaces/enumsql";

    export let model : ITable
    let cols : IColumnUI[]


    function generateRow(row : IColumnUI)
    {
      let pk = ""
      let defaultvalue = row.default.value.trim().length  != 0 ? `DEFAULT ${row.default.value}` : "";
    
        pk = `<pre data-prefix=">"><code>  ${row.columnName} ${row.type}${row.length != "" ? "("+row.length+")" : ""} ${defaultvalue}</code></pre>`
            
      return pk 
    }

    onMount(()=>
    {
        cols = model.colums
    })
</script>


