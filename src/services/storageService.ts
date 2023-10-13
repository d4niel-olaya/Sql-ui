import type{ IColumn,ITable } from "../interfaces/base";

class storageService
{
    private tables : ITable[];

    constructor()
    {
        this.tables = [];
    }

    create(table: ITable):void{
        this.tables.push(table);
        localStorage.setItem("tables", JSON.stringify(this.tables));
    }
}