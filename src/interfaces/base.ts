interface IColumn
{
    colunmName: string;
    datatype : string;
    options : string;
}

interface ITable
{
    id : number;
    tableName: string;
    colums: IColumn []
}