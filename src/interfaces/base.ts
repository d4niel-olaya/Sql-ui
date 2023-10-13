export interface IColumn
{
    colunmName: string;
    datatype : string;
    options : IOptions
}

export interface ITable
{
    id : number;
    tableName: string;
    colums: IColumn []
}

export interface IOptions
{
    primaryKey? : boolean,
    allowNull? : boolean
    defaultValue? : boolean
}           

