<script lang="ts">
   import { script } from "../services/scriptSql";
</script>

<div class="w-6/12 max-h-screen">
   <div class="mt-2 mr-2 ml-2 mb-2 overflow-y-auto h-56 p-2 max-h-56  rounded-md" id="board">
      <textarea class="textarea textarea-bordered w-full h-52 w-6/12" bind:value={$script}></textarea>
   </div>
</div>