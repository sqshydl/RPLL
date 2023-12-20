import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
    // Mendapatkan data dari body request
    const { pcName, totalProfit, date, time } = req.body;

    try {
        // Menjalankan query SQL untuk memasukkan data ke dalam database
        const result = await sql`
            INSERT INTO pc_profit (pc_name, total_profit, Date, Time) 
            VALUES (${pcName}, ${totalProfit}, ${date}, ${time})
        `;
        // Mengirim response dengan status 200 dan pesan sukses
        return res.status(200).json({ message: 'Data berhasil dimasukkan', result });
    } catch (error) {
        // Menampilkan pesan error jika terjadi kesalahan saat memasukkan data
        console.error('Error saat memasukkan data:', error.message);
        // Mengirim response dengan status 500 dan pesan error
        return res.status(500).json({ error: 'Error saat memasukkan data' });
    }
}