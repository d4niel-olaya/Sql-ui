import { writable } from "svelte/store";
import { dimensionService } from "./dimensionService";
const service = new dimensionService()
export const boardTop = writable(0)
export const boardLeft = writable(service.getDimension())
export const mainContainer = writable(service.getMainDimension())
export const toogleContainer = writable(service.getToggleDimension())