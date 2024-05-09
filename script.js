function createRoom() {
    // Get the room name entered by the user
    const roomName = document.getElementById("roomNameInput").value.trim();
    
    // Check if the room name is empty
    if (roomName === "") {
        alert("Please enter a room name.");
        return; // Exit the function early if room name is empty
    }

    // Generate a random join code
    const joinCode = generateJoinCode(roomName);
    
    // Redirect the user to the newly created room
    window.location.href = `room.html?roomName=${encodeURIComponent(roomName)}&joinCode=${encodeURIComponent(joinCode)}`;
}

function joinRoom() {
    // Get the join code entered by the user
    const joinCode = document.getElementById("joinCodeInput").value.trim();

    // Check if the join code is empty
    if (joinCode === "") {
        alert("Please enter a join code.");
        return; // Exit the function early if join code is empty
    }

    // Check if the join code has a length of 6 characters
    if (joinCode.length !== 6) {
        alert("Invalid join code. Please enter a 6-character code.");
        return; // Exit the function early if join code is invalid
    }

    // Redirect the user to the room page with the join code
    window.location.href = `room.html?joinCode=${encodeURIComponent(joinCode)}`;
}

function generateJoinCode(roomName) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 6;

    let result;
    let existingRoomData = localStorage.getItem(roomName);

    if (existingRoomData) {
        // If room name already exists, generate a unique join code for that room
        let existingJoinCodes = JSON.parse(existingRoomData);
        do {
            result = '';
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
        } while (existingJoinCodes[result]);

        existingJoinCodes[result] = true; // Mark the generated join code as used
        localStorage.setItem(roomName, JSON.stringify(existingJoinCodes));
    } else {
        // If room name doesn't exist, generate a new entry in the local storage
        let joinCodes = {};
        do {
            result = '';
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
        } while (localStorage.getItem(result)); // Ensure the join code is unique

        joinCodes[result] = true;
        localStorage.setItem(roomName, JSON.stringify(joinCodes));
    }

    // Initialize the number of people in the room to 1
    localStorage.setItem(`${roomName}_count`, '1');

    return result;
}

