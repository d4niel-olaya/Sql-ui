import type{ IColumnUI,ITable } from "../interfaces/base";

class storageService
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

}