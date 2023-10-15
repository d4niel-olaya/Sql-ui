

export interface ITable
{
    id : number;
    tableName: string;
    colums: IColumnUI []
}

export interface IColumnUI
{
    id: number
    columnName : string;
    type:string
    default:string
    constraint : string
}
         

