import os
import json

file_path = '/src/data/content.json'

try:
    size = os.path.getsize(file_path)
    print(f"File size: {size} bytes")
    
    with open(file_path, 'r') as f:
        content = f.read()
        print(f"Content length: {len(content)}")
        print(f"Last 100 chars: {content[-100:]}")
        
    try:
        json.loads(content)
        print("JSON is valid")
    except json.JSONDecodeError as e:
        print(f"JSON error: {e}")
        
except Exception as e:
    print(f"Error: {e}")
