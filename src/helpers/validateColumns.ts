import type { IColumnUI } from "../interfaces/base";



export class helperValidate
{
    static validateColunms(columns : IColumnUI[]) : boolean
    {
        return columns.some(col =>
            {
                return (
                    this.isEmpty(col.columnName) ||
                    this.isEmpty(col.constraint) ||
                    this.isEmpty(col.type)
                )
            })
    }

    static isEmpty(field:string) : boolean
    {
        return field.trim().length == 0;
    }
}