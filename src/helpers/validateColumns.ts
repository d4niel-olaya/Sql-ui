import type { IColumnUI, IDefault, ITable } from "../interfaces/base";



export class helperValidate
{
    static validateColunms(columns: IColumnUI[]) : boolean
    {
        return columns.some(col =>
            {
                return (
                    this.isEmpty(col.columnName) ||
                   // this.isEmpty(col.constraint) ||
                    this.isEmpty(col.type) 

                )
            })
    }

    static isEmpty(field:string) : boolean
    {
        return field.trim().length == 0;
    }

    static isEmptyDefault(field : IDefault)
    {
        if(field.custom)
        {
            return field.value.trim().length == 0
        }
        return field.custom ? field.value.trim().length == 0 : false
    }
}