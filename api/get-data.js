import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  try {
    // Menjalankan query SQL untuk mengambil semua data dari tabel pc_profit
    const results = await sql`SELECT * FROM pc_profit`;
    // Mengirim response dengan status 200 dan data yang diambil dari database
    return response.status(200).json(results.rows);
  } catch (error) {
    // Menampilkan pesan error jika terjadi kesalahan saat menjalankan query
    console.error('Error executing query:', error);
    // Mengirim response dengan status 500 dan pesan error
    return response.status(500).json({ error: 'Error executing query' });
  }
}