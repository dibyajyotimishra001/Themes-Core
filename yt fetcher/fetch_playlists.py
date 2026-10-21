import json
import yt_dlp

# अपने चैनल के playlists टैब का लिंक यहाँ डालो
CHANNEL_PLAYLISTS_URL = "https://www.youtube.com/@Themescore/playlists"

ydl_opts = {
    'extract_flat': True, # सुपरफास्ट फेचिंग: सिर्फ मेटाडेटा और IDs निकालेगा
    'quiet': False,
    'ignoreerrors': True,
}

playlists_data = []

print("Fetching playlists from channel...")

with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    # 1. चैनल की सारी प्लेलिस्ट की लिस्ट निकालो
    result = ydl.extract_info(CHANNEL_PLAYLISTS_URL, download=False)
    
    if 'entries' in result:
        for playlist in result['entries']:
            if not playlist:
                continue
                
            playlist_id = playlist.get('id')
            playlist_title = playlist.get('title')
            playlist_url = playlist.get('url') or f"https://www.youtube.com/playlist?list={playlist_id}"
            
            print(f"Extracting videos for playlist: {playlist_title}...")
            
            # 2. अब हर प्लेलिस्ट के अंदर जाकर उसके वीडियो IDs निकालो
            pl_info = ydl.extract_info(playlist_url, download=False)
            video_ids = []
            
            if pl_info and 'entries' in pl_info:
                for video in pl_info['entries']:
                    if video and video.get('id'):
                        video_ids.append(video['id'])
            
            # अगर प्लेलिस्ट खाली नहीं है, तो उसे लिस्ट में जोड़ लो
            if video_ids:
                playlists_data.append({
                    "playlist_id": playlist_id,
                    "title": playlist_title,
                    "count": len(video_ids),
                    "video_ids": video_ids # सबसे पहला ID लेटेस्ट/टॉप वीडियो होगा
                })

# 3. डेटा को playlists.json में सेव करो
with open('playlists.json', 'w', encoding='utf-8') as f:
    json.dump(playlists_data, f, ensure_ascii=False, indent=4)

print(f"\nBoom! Successfully saved {len(playlists_data)} playlists into playlists.json!")