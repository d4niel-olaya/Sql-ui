import type { ITable } from "../interfaces/base";
import { columnTypes, columnConstraints } from "../interfaces/enumsql";

export class scriptProvider{
    public tables : ITable[];

    constructor(_tables:ITable[])
    {
        this.tables = _tables;
    }
    iterateTables() : void
    {
        const result = this.tables.map((t) => this.generateSchema(t));
        console.log(result);
    }
    generateSchema(table : ITable) : string
    {
        const sch = [];
        sch.push("CREATE TABLE "+ table.tableName + " (");
        for(const col of table.colums)
        {
            sch.push(`${col.columnName} ${col.type} ${col.default}, ${col.constraint}`)
        }
        sch.push(")")
        return sch.join(",");
    }
}