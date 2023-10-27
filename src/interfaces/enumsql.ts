

export enum columnTypes
{
    BIGINT = 'bigint',
    INT = 'int',
    VARCHAR = 'varchar',
    DATE = 'date',
    FLOAT = 'float',
    BOOLEAN = 'boolean',
    TEXT = 'text',
    DECIMAL = 'decimal',
    CHAR = 'char',
}


export enum columnConstraints
{
    NOT_NULL = 'NOT NULL',
    NULL = 'NULL',
    UNIQUE = 'UNIQUE',
    PRIMARY_KEY = 'PRIMARY KEY',
    PRIMARY_KEY_AI = "PRIMARY KEY AUTO_INCREMENT",
    FOREIGN_KEY = 'FOREIGN KEY',
}