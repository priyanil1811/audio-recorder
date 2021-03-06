// Adapted from this example:
// https://medium.com/@bryanjenningz/how-to-record-and-play-audio-in-javascript-faa1b2b3e49b

// Document elements
let startBtn = document.getElementById(`start`)
let stopBtn = document.getElementById(`stop`)
let recordImg = document.getElementById(`microphone-img`)
let audioContainer = document.querySelector(`.listing-table`)
let recordMsg = document.getElementById(`record-msg`)
let recordListInfo = document.getElementById(`record-list-info`)

// set default row id for audio records
let tblRowId = 1

// Load up the microphone, setup the event listeners, etc
// this is the main execution that does all the work, it's called when the document is loaded fully (listener is at the bottom of this script)!
let loadMicrophone = async function() {
	let audioChunks = [] // An array to store all of the recording bits
	
	// Get the microphone ready
	let stream = await navigator.mediaDevices.getUserMedia({ audio: true })
	
	// Setup a stream for recording to
	const mediaRecorder = new MediaRecorder(stream)
	
	// When the stream STARTS recording
	mediaRecorder.addEventListener("start", function(event) {
		audioChunks = []
		recordingNow(true)
	})

	// When the stream STOPS recording
	mediaRecorder.addEventListener("stop", function(event) {
		const audioBlob = new Blob(audioChunks)  // Compile the recording bits
		const audioUrl = URL.createObjectURL(audioBlob)  // Turn into a file
        createAudioRecord(audioUrl)  // call function to add new audio element
		recordingNow(false)  // Inform the UI that we're not recording
	})
	
	// As soon as some bytes are ready to save
	mediaRecorder.addEventListener("dataavailable", function(event) {
		audioChunks.push(event.data)
	})
	
	// When the start button is clicked, start recording
	startBtn.addEventListener(`click`, function(event) {
		mediaRecorder.start()
	})
  
	// When the stop button is clicked, stop recording
	stopBtn.addEventListener(`click`, function(event) {
		mediaRecorder.stop()
	})
}

// Handle the UI stuff, like toggling the buttons and put the recording border
let recordingNow = function(isRecording) {
	// Toggle the button activation
	startBtn.disabled = isRecording
	stopBtn.disabled = !isRecording
	
	// Change the state of button
	if (isRecording) {
        startBtn.classList.add(`disabled`)
        stopBtn.classList.remove(`disabled`)
		recordImg.classList.remove(`hidden`)
		recordMsg.classList.add(`hidden`)
		
	} else {
        stopBtn.classList.add(`disabled`)
        startBtn.classList.remove(`disabled`)
		recordImg.classList.add(`hidden`)
		recordMsg.classList.remove(`hidden`)
		recordListInfo.classList.add(`hidden`)
	}
}

// function to add new audio element using audio source
let createAudioRecord = function(audioSource) {

	// create row elements
	const tableRow = document.createElement('tr')
		// set id for row element
		tableRow.setAttribute('id', tblRowId)

	// create first column
	const tableData1 = document.createElement('td')
		
		tableData1.append(tblRowId)

	const tableData = document.createElement('td')
		
		// create new audio element in document
		const newAudioElement = document.createElement('audio')

		// set source parameter for audio
		newAudioElement.setAttribute('src', audioSource)

		// set controls parameter to display all controls
		newAudioElement.setAttribute('controls', true)

		// append audio element in first column
		tableData.append(newAudioElement)

	const tableData2 = document.createElement('td')

		// create delete icon element
		const dltIcon = document.createElement('i')
		dltIcon.setAttribute('class', 'fas fa-trash-alt')
		dltIcon.setAttribute('onclick', `deleteAudioRecord(${tblRowId})`)

		// add delete icon in second column
		tableData2.append(dltIcon)
		
		// increase id for next audio record
		tblRowId++; 

		// append columns with row
		tableRow.append(tableData1)
		tableRow.append(tableData)
		tableRow.append(tableData2)
		
		// append row in listing table
		audioContainer.append(tableRow)
}

// create function to delete row when row id provided
let deleteAudioRecord = function(dltRowId) {

	// ask for confirmation to delete
	let confirmDlt = confirm("Are you sure to delete?");
	
	// if approved
	if (confirmDlt === true) {

		// get and delete row
		let row = document.getElementById(dltRowId);
		row.parentNode.removeChild(row);
	
		// count row in table
		let countRow = document.querySelector(`.listing-table`).rows.length

		// check if table is empty
		if (countRow === 0) {
			recordListInfo.classList.remove(`hidden`)  // if yes display msg
		}
	}
}

// When the window is loaded and ready to go, get the Microphone ready
window.addEventListener(`load`, loadMicrophone)