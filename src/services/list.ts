import { writable } from "svelte/store";
import { storageService } from "../services/storageService";
const service = new storageService().get()
export const listTables = writable(service);