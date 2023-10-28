import type { ITable } from "../interfaces/base";
import { columnConstraints } from "../interfaces/enumsql";
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


    getById(id:number) : ITable
    {
        const tables = this.get();
        const table = tables.filter(t => t.id == id);
        return table[0];
    }

    updateCoords(id:number, x:number,y:number)
    {
        let tables: ITable[] = this.get();
        let index = tables.findIndex(t => t.id == id);
        tables[index].x = x;
        tables[index].y = y;
        localStorage.setItem("tables", JSON.stringify(tables));
     }

     updateDimensions(id:number, w:number,h:number)
     {
        let tables: ITable[] = this.get();
        let index = tables.findIndex(t => t.id == id);
        tables[index].w = w;
        tables[index].h = h;
        localStorage.setItem("tables", JSON.stringify(tables));
     }

     getTablesWithPR():number[]
     {
         let res = localStorage.getItem("tables-with-pr") || null
         if(res != null)
         {
             let tables : number[] = JSON.parse(res)
             return tables
         }
         let table : number[] = [] 
         return table
     }

     createTableWithPR(idTable: number):void{
        let tables: number[] = this.getTablesWithPR();
        tables.push(idTable);
        localStorage.setItem("tables-with-pr", JSON.stringify(tables));
    }

    loopTableWithPr(table : ITable)
    {
        let colums = table.colums
        for(let col in colums)
        {
            if(colums[col].constraint.includes(columnConstraints.PRIMARY_KEY))
            {
                this.createTableWithPR(table.id);
            }
        }
    }

}