import type { ITable } from "../interfaces/base";

export class storageService
{

    create(table: ITable):void{
        let tables: ITable[] = this.get();
        tables.push(table);
        localStorage.setItem("tables", JSON.stringify(tables));
    }

    get():ITable[]
    {
        let res = localStorage.getItem("tables") || null
        if(res != null)
        {
            let tables : ITable[] = JSON.parse(res)
            return tables
        }
        let table : ITable[] = [] 
        return table
    }


    getById(id:number) : ITable[]
    {
        const tables = this.get();
        const table = tables.filter(t => t.id == id);
        return table;
    }

}