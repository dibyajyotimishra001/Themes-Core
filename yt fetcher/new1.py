import yt_dlp
import json

channel_url = input("Enter channel link (e.g., https://www.youtube.com/@ThemesCore/videos): ")

# extract_flat: True reads the exact Channel Grid page you see in DevTools!
ydl_opts = {
    'extract_flat': True,
    'quiet': True,
    'no_warnings': True
}

print("Fetching 100% original DevTools thumbnail links... ⚡")

with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    info = ydl.extract_info(channel_url, download=False)
    entries = info.get('entries', [])

# Map each video ID to its exact DevTools 16:9 thumbnail link
valid_thumbs = {}
for v in entries:
    if v and v.get('id') and v.get('thumbnails'):
        valid_thumbs[v['id']] = v['thumbnails'][-1]['url']

# Update your existing videos.json without touching descriptions or dates
with open("videos.json", "r", encoding="utf-8") as file:
    videos = json.load(file)

for video in videos:
    vid_id = video.get("id")
    if vid_id in valid_thumbs:
        video["thumbnail"] = valid_thumbs[vid_id]

with open("videos.json", "w", encoding="utf-8") as file:
    json.dump(videos, file, ensure_ascii=False, indent=4)

print("✅ Done! All broken thumbnails fixed in videos.json!")