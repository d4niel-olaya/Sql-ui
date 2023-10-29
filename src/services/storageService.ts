import type { IPk, ITable, ITablePK_FK } from "../interfaces/base";
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

     getTablesWithPR():IPk[]
     {
         let res = localStorage.getItem("tables-with-pr") || null
         if(res != null)
         {
             let tables : IPk[] = JSON.parse(res)
             return tables
         }
         let table : IPk[] = [] 
         return table
     }

     createTableWithPR(idTable: number, idCol : number, colType : string):void{
        let tables: IPk[] = this.getTablesWithPR();
        tables.push({tableId:idTable, columnId: idCol, columnType:colType});
        localStorage.setItem("tables-with-pr", JSON.stringify(tables));
    }

    loopTableWithPr(table : ITable)
    {
        let colums = table.colums
        for(let col in colums)
        {
            if(colums[col].constraint.includes(columnConstraints.PRIMARY_KEY))
            {
                this.createTableWithPR(table.id, colums[col].id,colums[col].type);
            }
        }
    }


    getNameAndColumn(id:number, idcol:number) : string
    {
        let t = this.getById(id);
        console.log(idcol)
        console.log(t.colums)
        let cols = t.colums
        let col = cols.filter(c => c.id == idcol)
        return t.tableName + ' - ' + col[0].columnName
    }

    getTablesWithPRandFK():ITablePK_FK[]
     {
         let res = localStorage.getItem("tables-with-pr-and-fk") || null
         if(res != null)
         {
             let tables : ITablePK_FK[] = JSON.parse(res)
             return tables
         }
         let table : ITablePK_FK[] = [] 
         return table
     }



     createTableWithPRandFk(idTablePR: number, idTableFk: number):void{
        let tables: ITablePK_FK[] = this.getTablesWithPRandFK();
        tables.push({tablerIdFk:idTableFk, tableIdPK:idTablePR});
        localStorage.setItem("tables-with-pr-and-fk", JSON.stringify(tables));
    }

    loopTableWithPrAndFk(table : ITable)
    {
        let colums = table.colums
        for(let col in colums)
        {
            if(colums[col].constraint == columnConstraints.FOREIGN_KEY)
            {
                this.createTableWithPRandFk(colums[col].pk_fk.tableIdPK,table.id)
            }
        }
    }

}