import type { IPK_FK, ITable } from "../interfaces/base";
import { columnTypes, columnConstraints } from "../interfaces/enumsql";
import { storageService } from "./storageService";

export class scriptProvider{
    public tables : ITable[];

    constructor(_tables:ITable[])
    {
        this.tables = _tables;
    }
    iterateTables() : string[]
    {
        const result = this.tables.map((t) => this.generateBaseSql(t));
        //console.log(result.join("").split(","))
        return result.join("").split(",");
    }
    generateSchema(table : ITable) : string
    {
        const sch = [];
        let separator : string;
        console.log(this.generateBaseSql(table));
        sch.push("CREATE TABLE "+ table.tableName + " (");
        for(let i = 0; i < table.colums.length ; i++)
        {
            if(table.colums.length == 1  ||  i == (table.colums.length-1))
            {
                separator = ""
            }else{
                separator = ","
            }
            let defaultvalue = table.colums[i].default.value.trim().length  != 0 ? `DEFAULT ${table.colums[i].default.value}` : "";
            let tConstraint = ""
            let tNormalConstraint = ""
            if(table.colums[i].constraint == columnConstraints.FOREIGN_KEY) // validating fk constraint
            {
                tConstraint = this.getRelation(table.colums[i].pk_fk)
            }else{
                tNormalConstraint = table.colums[i].constraint
            }
            sch.push(`${table.colums[i].columnName} ${table.colums[i].type} ${table.colums[i].length != "" ? "("+table.colums[i].length+")" : ""} ${defaultvalue} ${tNormalConstraint} ${separator}`)
            if(tConstraint != "")
            {

                sch.push(","+tConstraint)
            }
        }
        sch.push("); \n")
        return sch.join("");
    }


    getRelation(t : IPK_FK) : string
    {
        let service = new storageService();
        let tPK = service.getById(t.tableIdPK)
        let tPkName = tPK.tableName
        let tPkCol = tPK.colums.filter(c => c.id == t.columnPKId)
        let sqlConstraint = `FOREING KEY(${t.columnNameFk}) REFERENCES ${tPkName}(${tPkCol[0].columnName})`
        return sqlConstraint
    }

    generateBaseSql(table : ITable) : string
    {
        let sql : string[] = [];
        let separator : string;
        sql.push("CREATE TABLE "+ table.tableName + " (");
        for(let i = 0; i < table.colums.length ; i++)
        {
            if(table.colums.length == 1  ||  i == (table.colums.length-1))
            {
                separator = ""
            }else{
                separator = ","
            }
            let defaultvalue = table.colums[i].default.value.trim().length  != 0 ? `DEFAULT ${table.colums[i].default.value}` : "";
            if(table.colums[i].constraint == columnConstraints.FOREIGN_KEY)
            {
                sql.push(`${table.colums[i].columnName} ${table.colums[i].type} ${table.colums[i].length != "" ? "("+table.colums[i].length+")" : ""} ${defaultvalue}${separator}`)
            }
            else{
                sql.push(`${table.colums[i].columnName} ${table.colums[i].type}${table.colums[i].length != "" ? "("+table.colums[i].length+")" : ""} ${defaultvalue} ${table.colums[i].constraint}${separator}`)
            }
            console.log(sql.join(""))
        }   

        for(let i = 0; i < table.colums.length ; i++)
        {
            if(table.colums.length == 1  ||  i == (table.colums.length-1))
            {
                separator = ""
            }else{
                separator = ","
            }
            if(table.colums[i].pk_fk.tableIdPK != 0)
            {
                sql.push(","+this.getRelation(table.colums[i].pk_fk))
            }
        }
        sql.push("); \n")
        return sql.join("");
    }
}