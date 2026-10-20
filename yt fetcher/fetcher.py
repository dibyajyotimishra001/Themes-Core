import yt_dlp
import json

# Paste ANY channel link here
raw_url = input("Enter channel link: ")

# 1. Clean the URL and force the '/videos' tab (Blocks Shorts)
clean_url = raw_url.split("?")[0].rstrip("/")
if not clean_url.endswith("/videos"):
    for tab in ["/shorts", "/streams", "/featured", "/playlists"]:
        if clean_url.endswith(tab):
            clean_url = clean_url[:-len(tab)]
    channel_videos_url = clean_url + "/videos"
else:
    channel_videos_url = clean_url

ydl_opts = {
    'extract_flat': 'in_playlist',
    'quiet': True,
    'ignoreerrors': True
}

print(f"Fetching videos from: {channel_videos_url} ... ⏳")

with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    info = ydl.extract_info(channel_videos_url, download=False)
    entries = info.get('entries', [])

# Create an empty list to store video objects
video_list = []

for video in entries:
    if not video:
        continue
        
    video_id = video.get('id', '')
    title = video.get('title', '')
    
    # Check for valid 11-character YouTube Video ID
    if len(video_id) != 11 or not title:
        continue
        
    # Fetch the exact HD thumbnail link that YouTube shows in DevTools
    thumbnails = video.get('thumbnails', [])
    if thumbnails:
        # The last item [-1] in the list is always the highest resolution (hq720)
        thumbnail_url = thumbnails[-1].get('url')
    else:
        thumbnail_url = f"https://i.ytimg.com/vi/{video_id}/hq720.jpg"
    
    # Append ONLY title and thumbnail to the list
    video_list.append({
        "title": title,
        "thumbnail": thumbnail_url
    })

# Save the list directly into 'videos.json'
with open("videos.json", "w", encoding="utf-8") as file:
    json.dump(video_list, file, ensure_ascii=False, indent=4)

print(f"Done! 🔥 Total {len(video_list)} videos saved in 'videos.json'!")