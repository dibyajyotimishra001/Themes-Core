// Fetching contents from json
const contents = document.querySelector(".contents");

// Function to fetch JSON and render videos
async function loadVideos() {
    try {
        // 1. Fetch the JSON file (keep videos.json in the same folder as index.html)
        const response = await fetch('../yt fetcher/videos.json');
        const videos = await response.json();

        // 2. Loop through every video object in the JSON array
        videos.forEach(video => {
            // Create the main card div
            const card = document.createElement('div');
            card.className = 'vid'; // Your CSS class

            // Create the img tag for thumbnail
            const img = document.createElement('img');
            img.src = video.thumbnail;
            img.alt = video.title;
            img.className =  'thum';

            // Create the p tag for title
            const title = document.createElement('p');
            title.textContent = video.title;
            title.className = "title";

            // Put img and p inside the card div
            card.appendChild(img);
            card.appendChild(title);

            // Append the card into the main grid container
            contents.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading videos.json:", error);
    }
}

// Call the function when the page loads
loadVideos();