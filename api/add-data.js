import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  const { pcName, totalProfit, date, time } = req.body;

  try {
    const result = await sql`
      INSERT INTO pc_profit (pc_name, total_profit, Date, Time) 
      VALUES (${pcName}, ${totalProfit}, ${date}, ${time})
    `;
    return res.status(200).json({ message: 'Data inserted successfully', result });
  } catch (error) {
    console.error('Error inserting data:', error.message);
    return res.status(500).json({ error: 'Error inserting data' });
  }
}