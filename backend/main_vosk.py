from fileinput import filename
import os
import subprocess
import json
from re import match
from python.example.chatterbox_vosk import chatterbox_vosk

def run_vosk(audio_filename):
    
    print("Running Vosk")
    # ---------------- Get Audio File ------------------
    # main_directory = './chatterbox-vosk'
    # filename_list = os.listdir(main_directory) 
    # audio_file = [audio for audio in filename_list if match(r"audio.mp4", audio)]
    # audio_filename = main_directory + "/" + audio_file[0]
    if audio_filename[-3:] == 'mp4':
        audio_wavfile = audio_filename.replace(".mp4", ".wav")
    else:
        audio_wavfile = audio_filename.replace(".mp3", ".wav")
    # -- Convert mp4 to wav -- 
    subprocess.call('ffmpeg -i ' + audio_filename + ' -vn -acodec pcm_s16le -ar 44100 -ac 2 ' + audio_wavfile + ' -y', shell=True)

    # ----------- Convert audio to text -----------------
    # data_dict = {}
    # outputfilename = audio_filename + ".json"
    # outputfile = './output/'+ outputfilename
    outputresult = chatterbox_vosk(audio_wavfile)
    # Join all elements in the string
    separator = " "
    output = separator.join(outputresult)

    # if outputfile:
    #     dump_file = open(outputfile, "w")
    # else: 
    #     dump_file = None

    # if dump_file is not None:
    #     data_dict[audio_filename] = output
    #     json.dump(data_dict, dump_file)

    return output