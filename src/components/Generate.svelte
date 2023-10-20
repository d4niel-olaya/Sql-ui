<script lang="ts">
    import { script } from "../services/scriptSql";
    import { storageService } from "../services/storageService";
    import { scriptProvider } from "../services/scriptProvider";
    function generateScript()
    {
        let service = new storageService();
        let sctProvider = new scriptProvider(service.get());
        script.set(sctProvider.iterateTables());
    }
</script>


<div class="m-1 mr-14">
    <button class="btn btn-primary font-mono" on:click={generateScript}>
        Generate
    </button>
</div>
