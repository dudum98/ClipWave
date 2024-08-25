import os
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import google.generativeai as genai
import assemblyai as aai
from moviepy.editor import VideoFileClip, ImageClip, CompositeVideoClip
from PIL import Image
import requests
from io import BytesIO
from openai import OpenAI
from flask_cors import CORS
from flask import send_from_directory


app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'mp4', 'avi', 'mov'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER



def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/uploads/<filename>')
def serve_video(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

def extract_subtitles(video_path):
    transcriber = aai.Transcriber()
    transcript = transcriber.transcribe(video_path)
    sub = transcript.export_subtitles_srt()

    with open("subtitles.srt", "w") as f:
        f.write(sub)
    
    return sub

def analyze_subtitles(subtitles):
    model = genai.GenerativeModel('gemini-1.5-pro')
    response = model.generate_content(f"Generate a background image prompt based on the context of this transcript: {subtitles}")
    print("Generated prompt:", response.text)
    return response.text

def generate_image(prompt):
    response = client.images.generate(
        model="dall-e-3",
        prompt=prompt,
        size="1024x1024",
        quality="standard",
        n=1,
    )
    image_url = response.data[0].url
    return image_url

def overlay_image_on_video(video_path, image_url, output_path):
    # Download the image
    response = requests.get(image_url)
    img = Image.open(BytesIO(response.content))
    img.save("temp_overlay.png")

    # Load video and image
    video = VideoFileClip(video_path)
    overlay = (ImageClip("temp_overlay.png")
               .set_duration(video.duration)
               .resize(height=video.h)
               .set_pos(("center", "center")))

    # Set the opacity of the overlay
    overlay = overlay.set_opacity(0.3)

    # Composite video with overlay
    final_video = CompositeVideoClip([video, overlay])

    # Write output video
    final_video.write_videofile(output_path, codec="libx264")

    # Clean up
    os.remove("temp_overlay.png")

@app.route('/process_video', methods=['POST'])
def process_video():
    if 'video' not in request.files:
        return jsonify({'error': 'No video file provided'}), 400
    
    file = request.files['video']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        try:
            # Extract subtitles
            subtitles = extract_subtitles(filepath)
            
            # Analyze subtitles and generate image prompt
            image_prompt = analyze_subtitles(subtitles)
            
            # Generate image
            image_url = generate_image(image_prompt)
            
            # Overlay image on video
            output_path = os.path.join(app.config['UPLOAD_FOLDER'], f"processed_{filename}")
            overlay_image_on_video(filepath, image_url, output_path)
            
            return jsonify({'message': 'Video processed successfully', 'output_file': f"processed_{filename}"}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    return jsonify({'error': 'Invalid file type'}), 400

if __name__ == '__main__':
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    app.run(debug=True)