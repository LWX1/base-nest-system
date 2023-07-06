/**
 * 
 * @param column 返回的列元素
 * @param tableName 表名
 */
export const setTypeORMColumn = (column: string[], tableName: string) => {
    return column.map(item => `${tableName}.${item}`);
}