import { writable } from "svelte/store";
import { scriptProvider } from "./scriptProvider";
import { storageService } from "./storageService";

const service = new storageService();
export const scriptService = new scriptProvider(service.get())
export const script = writable(scriptService.iterateTables());