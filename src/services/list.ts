import { writable } from "svelte/store";
import { storageService } from "../services/storageService";
const mainservice = new storageService()
const service = mainservice.get()
const servicePR = mainservice.getTablesWithPR();
const servicePRFK = mainservice.getTablesWithPRandFK();
export const listTables = writable(service);
export const listTablesWithPr = writable(servicePR)
export const listTablesWithRelation = writable(servicePRFK)