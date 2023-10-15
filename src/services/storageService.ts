import type { ITable } from "../interfaces/base";

export class storageService
{
    constructor()
    {
        let example : ITable[]= [
            {
                id:1,
                tableName:"example",
                colums:[
                    {
                        id:1,
                        columnName:"example",
                        type:"text",
                        constraint:"not null",
                        default:"null"
                    }
                ]
            }
        ]
        localStorage.setItem("tables", JSON.stringify(example))
    }

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