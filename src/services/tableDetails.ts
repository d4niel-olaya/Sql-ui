import { writable } from "svelte/store";

export class detailsManager
{
    static set()
    {
        let res = !this.getVal()
        localStorage.setItem("details", res.toString());
    }

    static getVal()
    {
        let res = localStorage.getItem("details") || null
        if(res != null)
        {
            return res
        }
        return false
    }
}
export const details = writable(true)