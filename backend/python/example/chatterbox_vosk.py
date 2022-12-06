#!/usr/bin/env python3

import subprocess
import json
from vosk import Model, KaldiRecognizer, SetLogLevel
from re import match
from pathlib import Path
import os

def chatterbox_vosk(audio_file):
    SAMPLE_RATE = 16000

    # ---------------- Get Vosk Model -------------------
    model = Model("vosk-model-en-us")
    rec = KaldiRecognizer(model, SAMPLE_RATE)

    outputresult = []
    with subprocess.Popen(["ffmpeg", "-loglevel", "quiet", "-i",
                                audio_file,
                                "-ar", str(SAMPLE_RATE) , "-ac", "1", "-f", "s16le", "-"],
                                stdout=subprocess.PIPE) as process:

        while True:
            data = process.stdout.read(4000)
            if len(data) == 0:
                break
            if rec.AcceptWaveform(data):
                finalresult = json.loads(rec.Result())
                print("Result_: ", finalresult)
                outputresult.append(finalresult.get("text", ""))
        
        totalresult = json.loads(rec.FinalResult())
        outputresult.append(totalresult.get("text", ""))
        print("Final_Result: ", outputresult)

    return outputresult

