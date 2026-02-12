import csv
import json
import datetime
"""
x = [
    {
        "pk": 22,
        "model": "auth.permission",
        "fields": {
            "codename": "add_logentry",
            "name": "Can add log entry",
            "content_type": 8
        }
    },
    {
        "pk": 23,
        "model": "auth.permission",
        "fields": {
            "codename": "change_logentry",
            "name": "Can change log entry",
            "content_type": 8
        }
    },
    {
        "pk": 24,
        "model": "auth.permission",
        "fields": {     
            "codename": "delete_logentry",
            "name": "Can delete log entry",
            "content_type": 8
        }
    }
]
"""
with open('all-user-posts-picodobone.json',errors='ignore',encoding='ascii') as f:
    x = json.load(f)
    c = csv.writer(open("picodobone340.csv", "w"))
    # Write CSV Header, If you dont need that, remove this line
    c.writerow(['Caption', 'Image', 'Video','Time Created','Post URL','Post ID'])
   
    for x in x:
        caption_text=''
        stamp = ''
        if x["caption"] is None:
            caption_text=''
            if x["taken_at"] is not None:
                stamp = x["taken_at"]
        else:
            caption_text = x["caption"]["text"]
            stamp = x["caption"]["created_at"]
        if x["video_versions"] is not None: 
            c.writerow([caption_text,
                    x["image_versions2"]["candidates"][0]["url"],
                    x["video_versions"][0]["url"],
                    datetime.datetime.fromtimestamp(stamp),"https://www.instagram.com/p/"+x['shortcode'],
                    x['shortcode']])
        else:
            c.writerow([caption_text,
                    x["image_versions2"]["candidates"][0]["url"],
                    'None',
                    datetime.datetime.fromtimestamp(stamp),"https://www.instagram.com/p/"+x['shortcode'],
                    x['shortcode']])    