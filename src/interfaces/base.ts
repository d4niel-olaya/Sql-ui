

export interface ITable
{
    id : number;
    tableName: string;
    colums: IColumnUI []
    x:number,
    y:number,
    w:number,
    h:number
}

export interface IColumnUI
{
    id: number
    columnName : string;
    type:string;
    length:string;
    default:IDefault
    constraint : string
    fk : number
}

export interface IDefault
{
    custom:boolean
    value:string
}


export interface IPk
{
    tableId :number
    columnId:number
}

 

