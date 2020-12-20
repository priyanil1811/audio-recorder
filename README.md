# Javascript Project

- Student Name: Priyanka Patel
- Student Number: N01457528

## Dependecies

- You need allow browser to access your microphone for this program work.

## Instructions

- By default, this program will display empty recording table on left side, and start and stop recording buttons on right side.
- Audio recording can be done using start and stop recording buttons.
- When you click on stop button, it should create a new row in table on left side of the screen.
- Row columns: Unique id number, audio and delete icon.
- Audio column should allow to play, pause and download audio.
- Delete column should allow to delete the row when you click on delete icon.

## List of Javscript functions
- loadMicrophone: Load up the microphone, setup the event listeners. This function will be called when document is loaded.
- recordingNow: Handles UI changes according to the state of recording (true or false)
- createAudioRecord: Create a new row in table with new id, audio recording and delete icon.
- deleteAudioRecord: Delete the respective row from table according to given id.

## Resources
- [Font Awesome](https://fontawesome.com/icons?d=gallery)
- [Audio Recorder](https://codepen.io/roccop/pen/XWjNKYO)
