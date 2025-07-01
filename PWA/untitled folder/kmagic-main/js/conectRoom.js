authToken = localStorage.getItem('authToken');
const encodedToken = authToken;
function decodeJwt(token) {
    const [header, payload, signature] = token.split('.');

    // Decode the base64-encoded payload
    const decodedPayload = JSON.parse(atob(payload));

    // Access the decoded payload
    console.log(decodedPayload);

    // Access specific properties
    const { userId, username, roomId } = decodedPayload;
    console.log(userId, username, roomId);
    // Connect to the Socket.IO server and join the room
    const socket = io("https://keymagic-rooms.onrender.com", {
      auth: {
        token: authToken,
      },
    });

  socket.on("connect", () => {
    console.log("Connected to the server");
    socket.emit("joinRoom", roomId);
  });
  socket.on("receiveData", (data) => {
    console.log("Received data from server:", data);
  });

}

// Call the decodeJwt function with your encoded token
decodeJwt(encodedToken);

