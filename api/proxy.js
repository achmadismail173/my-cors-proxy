export default async function handler(req, res) {
  // Hanya izinkan method GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const url = req.query.url;

  // Validasi: pastikan ada parameter url
  if (!url) {
    return res.status(400).json({ error: 'Parameter "url" wajib diisi' });
  }

  try {
    // Ambil data dari URL target (Medium, dll)
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: `Target URL mengembalikan status ${response.status}` 
      });
    }

    const data = await response.text();

    // Set header CORS agar bisa diakses dari browser mana saja
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');

    return res.status(200).send(data);

  } catch (error) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(500).json({ error: error.message });
  }
}
