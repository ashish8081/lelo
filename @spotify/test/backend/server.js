const express = require('express');
const ytdlp = require('yt-dlp-exec');

const app = express();
const PORT = 3000;

app.use(express.static('../frontend')); // Serve frontend files

app.get('/search', async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).send('Query missing');

    try {
        const result = await ytdlp(`ytsearch5:${query}`, {
            dumpSingleJson: true,
            noCheckCertificates: true,
            noWarnings: true,
            format: 'bestaudio',
        });

        const songs = result.entries.map(entry => ({
            title: entry.title,
            url: entry.url,
            thumbnail: entry.thumbnail, // Include thumbnail URL
        }));

        res.json(songs);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing the request');
    }
});

app.listen(PORT, '0.0.0.0', () => console.log(`Server running on http://0.0.0.0:${PORT}`));
