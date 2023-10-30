<script lang="ts">
   import { script } from "../services/scriptSql";
    import CopyToClipboard from "./CopyToClipboard.svelte";
    let div : HTMLDivElement
</script>

<!--<div class="w-6/12 max-h-screen">
   <div class="mt-2 mr-2 ml-2 mb-2 overflow-y-auto h-56 p-2 max-h-56  rounded-md" id="board">
      <textarea class="textarea textarea-bordered textarea-primary w-full h-48 w-6/12" bind:value={$script}></textarea>
   </div>
</div>-->

<div class="w-6/12 max-h-screen">
   <div class="mt-2 mr-2 ml-2 mb-2 overflow-y-auto h-56 p-2 max-h-56" id="board" bind:this={div}>
         <div class="mockup-code h-full overflow-y-auto bg-slate-700 focus:outline-none" contenteditable="{$script.length != 0}" spellcheck="false">
            <CopyToClipboard div={div}/>
               {@html $script}
         </div>
   </div>
</div>