from tkinter import *
from tkinter import filedialog as fd
from tkinter.messagebox import showinfo
from turtle import title

def openFile():
    filename = fd.askopenfilename(title="Open File", 
                                filetypes=(('csv files','*.csv'), ('All files', '*.*')),
                                initialdir='/')
    print(filename)
    

root = Tk()
root.title("Open File Dialog")
root.geometry("300x100")
openButton = Button(root, text="Browse", command=openFile)
openButton.grid(column=0, row=1, sticky='w', padx=10, pady=10)

root.mainloop()