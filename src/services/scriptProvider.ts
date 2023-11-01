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
                tConstraint = this.getRelation(table.colums[i].pk_fk,separator)
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


    getRelation(t : IPK_FK, separator : string) : string
    {
        let service = new storageService();
        let tPK = service.getById(t.tableIdPK)
        let tPkName = tPK.tableName
        let tPkCol = tPK.colums.filter(c => c.id == t.columnPKId)
        let sqlConstraint = `<pre data-prefix=">"><code><span class="text-violet-500"> FOREING KEY</span>(${t.columnNameFk}) <span class="text-violet-500">REFERENCES</span> ${tPkName}(${tPkCol[0].columnName})${separator}</code></pre>`
        return sqlConstraint
    }

    generateBaseSql(table : ITable) : string
    {
        let sql : string[] = [];
        let separator : string;
       
        sql.push(`<pre data-prefix=">"><code><span class="text-violet-500">CREATE TABLE</span> ${table.tableName} (</code></pre>`);
        let colsFK = table.colums.filter(c => c.constraint == columnConstraints.FOREIGN_KEY)
        for(let i = 0; i < table.colums.length ; i++)
        {
            if(table.colums.length == 1  ||  i == (table.colums.length-1))
            {
                separator = ""
                
                if(colsFK.length !=0)
                {
                    separator = ','
                }
            }else{
                separator = ","
            }
            let defaultvalue : string = ""
            if(table.colums[i].default.value.trim().length  != 0)
            {
                defaultvalue = `DEFAULT ${table.colums[i].default.value}`
                if(table.colums[i].default.value == columnConstraints.NULL)
                {
                    defaultvalue = `<span class="text-violet-500">${table.colums[i].default.value}</span>`
                }
            }

            if(table.colums[i].constraint == columnConstraints.FOREIGN_KEY)
            {
                sql.push(`<pre data-prefix=">"><code>  ${table.colums[i].columnName} ${table.colums[i].type} ${table.colums[i].length != "" ? "("+table.colums[i].length+")" : ""} ${defaultvalue}${separator}</code></pre>`)
            }
            else{
                sql.push(`<pre data-prefix=">"><code>  ${table.colums[i].columnName} ${table.colums[i].type}${table.colums[i].length != "" ? "("+table.colums[i].length+")" : ""} ${defaultvalue} <span class="text-violet-500">${table.colums[i].constraint}</span>${separator}</code></pre>`)
            }
        }   

        for(let i = 0; i < colsFK.length ; i++)
        {
            if(colsFK.length == 1  ||  i == (colsFK.length-1))
            {
                separator = ""
            }else{
                separator = ","
            }
            sql.push(`${this.getRelation(colsFK[i].pk_fk,separator)}`)
            
        }
        sql.push(`<pre data-prefix=">"><code> );</code></pre> `)
        return sql.join("").replace(/\s/g," ");
    }
}