import { writable } from "svelte/store";
import { dimensionService } from "./dimensionService";
const service = new dimensionService().getDimension()
export const boardTop = writable(0)
export const boardLeft = writable(service)