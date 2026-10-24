# ⚡ Themes-Core

🚀 **Live Production Preview:** <https://themescore.netlify.app/>

## 🔥 Core Engineering Highlights

### 1. Single-Template Dynamic Routing (`details.html`)

Instead of relying on separate `.html` files for every individual video or theme, **Themes-Core** implements a **Single Dynamic Template Architecture**.

* A single `details.html` file serves as the master layout blueprint.
* When a user selects any video across the platform, Vanilla JavaScript captures the selection, retrieves the corresponding metadata from `videos.json`, and constructs the entire details view on the fly. Whether the platform scales to 10 videos or 10,000, the entire routing system operates seamlessly through **one** template file.

### 2. 100% Dynamic DOM Rendering

All video cards, playlists, and category views are generated programmatically at runtime.

* The core JavaScript modules (`function.js`, `script.js`, `category.js`) fetch structured payloads from `videos.json` and `playlists.json` and dynamically inject the UI components, thumbnails, titles, and category filters directly into the DOM.

### 3. Automated Python Data Pipeline & Zero-Latency JSON Store

The project utilizes a decoupled **Data-Extraction & Static-Serving Architecture** for maximum frontend speed.

* **Data Extraction & Cleaning:** The Python suite inside `yt fetcher/` acts as a dedicated data pipeline. When executed, it extracts the latest YouTube channel videos and playlists, automatically validates and repairs broken thumbnail URLs, and serializes the cleaned data into structured `videos.json` and `playlists.json` files.
* **Instant Client-Side Execution:** By serving pre-compiled JSON data stores directly to the browser, the HTML/CSS/JS frontend achieves instant data retrieval and zero server-computation latency in production.

## 🧠 System Architecture & Workflow

```text
[Data Pipeline Phase]
YouTube Channel ──► Python Scripts (yt fetcher/) ──► Compiles videos.json & playlists.json

[Live Production Phase (Netlify)]
videos.json & playlists.json ──► Vanilla JS (Fetch API) ──► Dynamically Renders Home, Categories & Details View
```

## ⚙️ Tech Stack

| Layer | Technologies Used |
| ----- | ----- |
| **Frontend Core** | HTML5, CSS3 (Modular Architecture), Vanilla JavaScript (Dynamic DOM Rendering, URL/State Routing, Fetch API) |
| **Data Store** | Pre-compiled Structured JSON (`videos.json`, `playlists.json`) |
| **Data Pipeline** | Python 3 (Automated YouTube data extraction, thumbnail validation, and JSON serialization) |
| **Deployment** | Netlify (Global CDN Hosting) |

## 📂 Repository Structure

```text
📦 Themes-Core
 ┣ 📂 pages
 ┃ ┣ 📜 about.html          # Platform & creator overview
 ┃ ┣ 📜 category.html       # Dynamic playlist/category filtering view
 ┃ ┣ 📜 contact.html        # User reach-out & inquiry view
 ┃ ┗ 📜 details.html        # Master dynamic template that renders any selected video
 ┣ 📂 scripts
 ┃ ┣ ⚙️ category.js         # Category filtering & dynamic playlist DOM injection
 ┃ ┣ ⚙️ contact.js          # Contact form handling & validation
 ┃ ┗ ⚙️ script.js           # Core UI interactions & dynamic state handling
 ┣ 📂 style
 ┃ ┣ 🎨 about.css           # Scoped styles for About page
 ┃ ┣ 🎨 category.css        # Scoped styles for Category view
 ┃ ┣ 🎨 contact.css         # Scoped styles for Contact view
 ┃ ┗ 🎨 main.css            # Global design tokens & layout utilities
 ┣ 📂 yt fetcher            # Automated Python Data Pipeline & JSON Store
 ┃ ┣ 🐍 Fetching_youtube_channel_data.py  # Extracts YouTube channel videos into JSON
 ┃ ┣ 🐍 Fixing_Broken_Thumnails.py        # Validates and repairs broken thumbnail URLs
 ┃ ┣ 🐍 fetch_playlists.py                # Extracts channel playlists into JSON
 ┃ ┣ 🗃️ playlists.json                    # Structured playlist data store consumed by JS
 ┃ ┗ 🗃️ videos.json                       # Structured video data store consumed by JS
 ┣ 🖼️ favicon.png           # Brand icon
 ┣ ⚙️ function.js           # Core JavaScript engine for fetching JSON & generating UI cards
 ┣ 📜 index.html            # Main application entry point (Home)
 ┗ 🎨 style.css             # Root stylesheet
```

## 🚀 Local Setup & Usage

### 1. Clone the Repository

```bash
git clone https://github.com/dibyajyotimishra001/themes-core.git
cd themes-core
```

### 2. Launch the Application

The frontend reads directly from the pre-compiled JSON data stores for instant execution:

* Open the project directory in **VS Code**.
* Launch `index.html` using **Live Server**.

### 3. Syncing Latest YouTube Data (Data Pipeline)

To sync the application with new uploads from the YouTube channel, run the Python pipeline inside the `yt fetcher` directory to refresh `videos.json` and `playlists.json`:

```bash
cd "yt fetcher"
python Fetching_youtube_channel_data.py
python fetch_playlists.py
python Fixing_Broken_Thumnails.py
```