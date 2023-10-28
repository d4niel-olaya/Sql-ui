import { writable } from "svelte/store";
import { storageService } from "../services/storageService";
const service = new storageService().get()
const servicePR = new storageService().getTablesWithPR();
export const listTables = writable(service);
export const listTablesWithPr = writable(servicePR)