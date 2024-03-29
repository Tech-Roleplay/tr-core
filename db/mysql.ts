import { createConnection, Connection, ConnectionOptions } from 'mysql2/promise';
import * as fs from 'fs';

// Read configuration from config.json
const configData = fs.readFileSync('config.json', 'utf8');
const config: { [key: string]: string } = JSON.parse(configData);

// Define MySQL connection configuration
const dbConfig: ConnectionOptions = {
    host: config.DB_HOST || 'localhost',
    user: config.DB_USER || 'username',
    password: config.DB_PASSWORD || 'password',
    database: config.DB_DATABASE || 'database_name'
};


// Exportable MySQL function
/**
 * Executes a SQL query against a MySQL database and returns the result.
 * 
 * @param sql - The SQL query string
 * @param values - Optional array of values to substitute into the query
 * @returns Promise resolving to the query result rows
 */
export async function executeQuery(sql: string, values?: any[]): Promise<any> {
    // Create a MySQL connection
    const connection: Connection = await createConnection(dbConfig);

    try {
        // Execute the query
        const [rows] = await connection.query(sql, values);
        return rows;
    } finally {
        // Close the MySQL connection
        await connection.end();
    }
}