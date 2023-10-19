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
        return result;
    }
    generateSchema(table : ITable) : string
    {
        const sch = [];
        sch.push("CREATE TABLE "+ table.tableName + " (" + "<br/>");
        for(const col of table.colums)
        {
            sch.push(`${col.columnName} ${col.type} ${col.default} ${col.constraint} <br/>`)
        }
        sch.push(");")
        return sch.join("<br/>");
    }
}