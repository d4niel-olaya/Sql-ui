import { writable } from "svelte/store";
import { scriptProvider } from "./scriptProvider";
import { storageService } from "./storageService";


export const script = writable([`<pre data-prefix=">" class="text-info"><code>.</code></pre>`]);