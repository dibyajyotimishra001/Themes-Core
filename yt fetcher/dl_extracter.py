import json
import re

def extract_downloads(description):
    # Isolate content starting from the download section
    if "Download link section" in description:
        target_area = description.split("Download link section")[1]
    else:
        target_area = description

    # Remove any subsequent guide or footer content
    if "How to Download" in target_area:
        target_area = target_area.split("How to Download")[0]

    # Normalize lines and strip whitespace
    lines = [line.strip() for line in target_area.splitlines() if line.strip()]
    
    downloads = []
    
    for i, line in enumerate(lines):
        # Match full URL structure
        url_match = re.search(r"(https?://\S+)", line)
        
        if url_match:
            full_url = url_match.group(1)
            
            # Strict Whitelist Filter: Proceed only if the URL contains 'tnlink'
            if "tnlink" in full_url:
                # Extract the corresponding label from the preceding line
                if i > 0:
                    raw_label = lines[i - 1]
                    # Clean emojis, symbols, and trailing delimiters
                    clean_label = re.sub(r"[^\w\s\(\)\.,]", "", raw_label).strip()
                else:
                    clean_label = "Download Theme"
                    
                downloads.append({
                    "label": clean_label,
                    "url": full_url
                })
                
    return downloads

# Load raw JSON dataset
with open("videos.json", "r", encoding="utf-8") as file:
    videos = json.load(file)

# Parse and append strictly filtered download metadata
for video in videos:
    desc = video.get("description", "")
    video["downloads"] = extract_downloads(desc)

# Persist transformed dataset
with open("videos_upgraded.json", "w", encoding="utf-8") as file:
    json.dump(videos, file, indent=4, ensure_ascii=False)