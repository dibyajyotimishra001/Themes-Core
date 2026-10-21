const container = document.getElementById('category-container');
const categoryHeader = document.getElementById('category-header');
const backBtn = document.getElementById('backToPlaylists');
const playlistTitleEl = document.getElementById('currentPlaylistTitle');

let allPlaylists = [];
let allVideos = [];

// 1. Fetch both JSON files in parallel for optimal loading speed
async function initCategoryPage() {
    try {
        const [playlistsRes, videosRes] = await Promise.all([
            fetch('../yt fetcher/playlists.json'),
            fetch('../yt fetcher/videos.json')
        ]);

        allPlaylists = await playlistsRes.json();
        allVideos = await videosRes.json();

        renderPlaylists(); // Render initial playlist view
    } catch (error) {
        console.error("Error loading category data:", error);
    }
}

// 2. State 1: Render all playlist cards
function renderPlaylists() {
    categoryHeader.style.display = 'none'; // Hide back button header
    container.innerHTML = '';

    allPlaylists.forEach(playlist => {
        // Get the latest video ID (first item in the array)
        const latestVideoId = playlist.video_ids[0];
        
        // Match video in videos.json for thumbnail, fallback to standard YouTube URL
        const matchedVideo = allVideos.find(v => v.id === latestVideoId);
        const thumbUrl = matchedVideo && matchedVideo.thumbnail 
            ? matchedVideo.thumbnail 
            : `https://i.ytimg.com/vi/${latestVideoId}/maxresdefault.jpg`;

        const card = document.createElement('div');
        card.className = 'vid'; // Replace with your homepage card class name
        card.style.cursor = 'pointer';

        card.innerHTML = `
            <img class="thum" src="${thumbUrl}" alt="${playlist.title}" loading="lazy" 
                    onerror="this.onerror=null; this.src='https://i.ytimg.com/vi/${latestVideoId}/hqdefault.jpg';">
            <span class="playlist-badge">📂 ${playlist.count} Videos</span>
            <p class="title">${playlist.title}</p>
        `;

        // Open playlist videos on click
        card.addEventListener('click', () => {
            renderPlaylistVideos(playlist);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        container.appendChild(card);
    });
}

// 3. State 2: Render videos belonging to the selected playlist
function renderPlaylistVideos(playlist) {
    categoryHeader.style.display = 'flex'; // Show back button and playlist title
    playlistTitleEl.textContent = playlist.title;
    container.innerHTML = '';

    // Map playlist video IDs to actual video objects from videos.json
    const playlistVideos = playlist.video_ids
        .map(id => allVideos.find(v => v.id === id))
        .filter(Boolean); // Filter out any missing or deleted videos

    playlistVideos.forEach(video => {
        const thumbUrl = video.thumbnail || `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`;

        const card = document.createElement('div');
        card.className = 'vid'; // Same homepage card class name
        card.style.cursor = 'pointer';

        card.innerHTML = `
            <img class="thum" src="${thumbUrl}" alt="${video.title}" loading="lazy"
                 onerror="this.onerror=null; this.src='https://i.ytimg.com/vi/${video.id}/hqdefault.jpg';">
            <p class="title">${video.title}</p>
        `;

        // Redirect to details.html with the selected video ID
        card.addEventListener('click', () => {
            window.location.href = `details.html?id=${video.id}`;
        });

        container.appendChild(card);
    });
}

// 4. Return to playlists view when Back button is clicked
if (backBtn) {
    backBtn.addEventListener('click', () => {
        renderPlaylists();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Initialize the category engine
initCategoryPage();