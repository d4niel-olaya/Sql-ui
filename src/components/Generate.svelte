<script lang="ts">
    import { storageService } from "../services/storageService";
    import { scriptProvider } from "../services/scriptProvider";
    let service = new storageService();
    function generateScript()
    {
        let sctProvider = new scriptProvider(service.get())
        sctProvider.iterateTables();
    }
</script>


<div class="m-1 mr-14">
    <button class="btn btn-primary font-mono" on:click={generateScript}>
        Generate
    </button>
</div>
