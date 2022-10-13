# Create Ubuntu Desktop executable to quickstart local chatterbox

### 1. Copy and Paste chatterbox-quickstart.desktop & chatterbox.sh files to Desktop folder
Drag and Drop within nautilus

<br/>

### 2. Copy and Paste shellscript commands in "add to bashrc.txt" to the end of /.bashrc
Edit lines 33 & 34 of "add to bashrc.txt" to /path/to/Chatterbox/frontend AND /backend
```
DEFAULT_TABS_CMD1="cd chatter-box/Chatterbox/backend"
DEFAULT_TABS_CMD2="cd chatter-box/Chatterbox/frontend"
```
**IMPORTANT: DO NOT DELETE ANYTHING FROM /.bashrc**
```
# how to edit /.bashrc
nano ~/.bashrc
# scroll to the bottom and paste
```
<br/>

### 3. Add execute permissions to shellscript and desktop files for current user
```
cd Documents
chmod +x chatterbox.sh
chmod +x chatterbox-quickstart.desktop
```
<br/>

### 4. Drag and drop chatterbox-quickstart.desktop within nautilus to Homepage
**Check if chatterbox-quickstart.desktop is executable**<br/>
Try changing properties of both files to executable

<br/>

### 5. ( If .desktop DOES NOT Execute )
Drag and drop chatterbox.sh to Desktop Page / Homepage <br/>
Check if it is executable <br/>
Go to Files > Select Preferences > Select Behavior Tab > Mark 'Ask what to do' option under Executable text file

<br/>

### 6. Execute chatterbox-quickstart to quickstart flask & react for chatterbox

<br/>

## Troubleshooting: 
https://askubuntu.com/questions/315408/open-terminal-with-multiple-tabs-and-execute-application/1026563#1026563.
