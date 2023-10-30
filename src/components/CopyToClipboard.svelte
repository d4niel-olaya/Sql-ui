
<script lang="ts">
    export let div: HTMLDivElement
    let copyFlag : boolean = false
    function copy()
    {
        navigator.clipboard.writeText(div.innerText);
        copyFlag = true
        setTimeout(function(){
                copyFlag = false;
            }, 3000);
    }
</script>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="absolute right-2 top-2 hover:cursor-pointer m-4" on:click={copy}>

    <div class="indicator" contenteditable="false">
        {#if copyFlag}
            <span class="indicator-item badge  indicator-start badge-primary">Copied!</span> 
        {/if}
        <button class="btn btn-ghost">
            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
        </button>
    </div>

 </div>