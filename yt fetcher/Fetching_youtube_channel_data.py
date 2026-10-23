import yt_dlp
import json

raw_url = input("Enter channel link: ") # Enter your channel link here

# 'skip_download' must be True, otherwise it will download all 200 videos!
ydl_opts = {
    'extract_flat': False, 
    'skip_download': True, 
    'ignoreerrors': True,
    'quiet': True,
    'no_warnings' : True
}

print("Fetching full details (Title, Description, Date) ... ⏳")

with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    info = ydl.extract_info(raw_url, download=False)
    entries = info.get('entries', [])

video_list = []

for video in entries:
    if not video:
        continue
        
    video_id = video.get('id', '')
    title = video.get('title', '')
    
    if len(video_id) != 11 or not title:
        continue
        
    # Fetch the exact HD thumbnail link that YouTube shows in DevTools
    thumbnails = video.get('thumbnails', [])
    if thumbnails:
        # The last item [-1] in the list is always the highest resolution (hq720)
        thumbnail_url = thumbnails[-1].get('url')
    else:
        thumbnail_url = f"https://i.ytimg.com/vi/{video_id}/hq720.jpg"
    
    # Extract description and date
    description = video.get('description', 'No description available.')
    raw_date = video.get('upload_date', '') # Comes in 'YYYYMMDD' format
    
    # Format the date nicely (20231024 -> 2023-10-24)
    formatted_date = f"{raw_date[:4]}-{raw_date[4:6]}-{raw_date[6:]}" if raw_date else "Unknown Date"

    video_list.append({
        "id": video_id,
        "title": title,
        "thumbnail": thumbnail_url,
        "description": description,
        "date": formatted_date
    })

with open("videos.json", "w", encoding="utf-8") as file:
    json.dump(video_list, file, ensure_ascii=False, indent=4)

print(f"Done! 🔥 Saved data for {len(video_list)} videos!")