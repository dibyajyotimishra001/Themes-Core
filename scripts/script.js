const contents = document.querySelector(".contents");

let allVideos = [];
let currentIndex = 0;
const BATCH_SIZE = 9; // Loads 21 videos at a time (divisible by 3 for desktop grid)

// Function to render the next batch of videos into the DOM
function renderNextBatch() {
    if (currentIndex >= allVideos.length) return;

    const nextBatch = allVideos.slice(currentIndex, currentIndex + BATCH_SIZE);

    nextBatch.forEach(video => {
        // Create the main card div
        const card = document.createElement('div');
        card.className = 'vid';
        card.style.cursor = "pointer";

        card.addEventListener("click", () => {
            window.location.href = `../pages/details.html?id=${video.id}`;
        });

        // Create the img tag for thumbnail
        const img = document.createElement('img');
        img.src = video.thumbnail;
        img.alt = video.title;
        img.className = 'thum';
        img.loading = 'lazy'; // Extra safety for mobile RAM

        // Safety net: if any thumbnail link ever fails, fallback to clean hqdefault
        img.onerror = function () {
            this.onerror = null;
            this.src = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
        };

        // Create the p tag for title
        const title = document.createElement('p');
        title.textContent = video.title;
        title.className = "title";

        // Put img and p inside the card div
        card.appendChild(img);
        card.appendChild(title);
        contents.appendChild(card);
    });

    currentIndex += BATCH_SIZE;
}

// Function to fetch JSON and start initial render
async function loadVideos() {
    try {
        const response = await fetch('../yt fetcher/videos.json');
        allVideos = await response.json();

        // 1. Load only the first 21 videos on page open
        renderNextBatch();

        // 2. Infinite Scroll: Load next 21 when user scrolls near the bottom
        window.addEventListener('scroll', () => {
            const scrolledToBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500);
            if (scrolledToBottom && currentIndex < allVideos.length) {
                renderNextBatch();
            }
        });

        // 3. Smart Search Fix: If user taps the search bar, load remaining items so search finds everything
        const searchBox = document.querySelector(".search");
        if (searchBox) {
            searchBox.addEventListener("focus", () => {
                while (currentIndex < allVideos.length) {
                    renderNextBatch();
                }
            }, { once: true });
        }

    } catch (error) {
        console.error("Error loading videos:", error);
    }
}

loadVideos();

// Search Box
const search = document.querySelector(".search");
const video = document.getElementsByClassName("vid");

const xIcon = document.querySelector(".bi-x-lg");
xIcon.style.display = "none";

search.addEventListener("input", ()=>{
    let searchContent = search.value.toLowerCase().trim();

    for(let i = 0; i < video.length; i++){
        let vidContent = video[i].innerText.toLowerCase().trim();

        if(vidContent.includes(searchContent)){
            video[i].style.display = "flex";
        }
        else{
            video[i].style.display = "none";
        }
        if(searchContent == ""){
            video[i].style.display = "flex";
            xIcon.style.display = "none";
        }
        if(searchContent != ""){
            xIcon.style.display = "flex";
            xIcon.addEventListener("click", ()=>{
                search.value = "";
                xIcon.style.display = "none";
                video[i].style.display = "flex";
            });
        }
    }
});

// SearchIcon

const searchIcon = document.querySelector(".searchIcon");
const searchBox = document.querySelector(".search-box");


searchIcon.addEventListener("click", ()=>{
    searchBox.classList.toggle("active");

    for(let i = 0; i < video.length; i++){
        if(!searchBox.classList.contains("active")){
            video[i].style.display = "flex";
        }
    }
});