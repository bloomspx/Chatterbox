# Export this variable so your ~/.bashrc file will see it and do the magic.

export OPEN_DEFAULT_TABS=true

# Open a new terminal window, which by default also sources your ~/.bashrc file again, 

# thereby kicking off the process since you set the `OPEN_DEFAULT_TABS` variable just above.

gnome-terminal 

OPEN_DEFAULT_TABS=      # set this variable back to an empty string so it's no longer in force

unset OPEN_DEFAULT_TABS # unexport it
