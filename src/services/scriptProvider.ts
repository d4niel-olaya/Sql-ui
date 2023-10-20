import type { ITable } from "../interfaces/base";
import { columnTypes, columnConstraints } from "../interfaces/enumsql";

export class scriptProvider{
    public tables : ITable[];

    constructor(_tables:ITable[])
    {
        this.tables = _tables;
    }
    iterateTables() : string[]
    {
        const result = this.tables.map((t) => this.generateSchema(t));
        //console.log(result.join("").split(","))
        return result.join("").split(",");
    }
    generateSchema(table : ITable) : string
    {
        const sch = [];
        let separator : string;
        sch.push("CREATE TABLE "+ table.tableName + " (");
        for(let i = 0; i < table.colums.length ; i++)
        {
            if(table.colums.length == 1  ||  i == (table.colums.length-1))
            {
                separator = ""
            }else{
                separator = ","
            }
            let defaultvalue = table.colums[i].default  != "" ? `DEFAULT ${table.colums[i].default}` : "";
            sch.push(`${table.colums[i].columnName} ${table.colums[i].type} ${defaultvalue} ${table.colums[i].constraint} ${separator}`)
        }
        sch.push("); \n")
        return sch.join("");
    }
}