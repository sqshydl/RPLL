import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  try {
    const results = await sql`SELECT * FROM pc_profit`;
    return response.status(200).json(results.rows);
  } catch (error) {
    console.error('Error executing query:', error);
    return response.status(500).json({ error: 'Error executing query' });
  }
}