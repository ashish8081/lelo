document.getElementById('search-btn').addEventListener('click', async () => {
    const query = document.getElementById('search').value;
    const response = await fetch(`/search?q=${encodeURIComponent(query)}`);
    const songs = await response.json();

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = songs.map(song => `
        <div class="song">
            <img src="${song.thumbnail}" alt="${song.title}" class="album-art">
            <div class="song-details">
                <h3>${song.title}</h3>
                <audio controls>
                    <source src="${song.url}" type="audio/mp3">
                </audio>
            </div>
        </div>
    `).join('');
});
