var client_id = process.env.REACT_APP_CLIENT_ID;
var redirect_uri ='https://main--famous-parfait-c57744.netlify.app/';
let userToken;

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
      randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomString;
}

function authorizeSpotify() {
    var stateKey = 'spotify_auth_state';
    var state = generateRandomString(16);

    localStorage.setItem(stateKey, state);
    var scope = 'user-read-private user-read-email playlist-modify-private playlist-modify-public';
    var authUrl = 'https://accounts.spotify.com/authorize';
        authUrl += '?response_type=token';
        authUrl += '&client_id=' + encodeURIComponent(client_id);
        authUrl += '&scope=' + encodeURIComponent(scope);
        authUrl += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    authUrl += '&state=' + encodeURIComponent(state);

    if(userToken) {
        return userToken;
    }

    const accessToken = window.location.href.match(/access_token=([^&]*)/);
    const expiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if(accessToken && expiresIn) {
        userToken = accessToken[1];
        const secondsExpiresIn = Number(expiresIn[1]);
        const millisecondsExpiresIn = secondsExpiresIn * 1000;
        window.setTimeout(() => userToken = "", millisecondsExpiresIn);
        window.history.pushState("Access Token", null, "/");
        return userToken;
    } else {
        
        window.location.href = authUrl;
    }
}

const searchTracks = async(query) => {
    const accessToken = await authorizeSpotify();
    const endpoint = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(query)}`;
    
    try {
        const response = await fetch(endpoint, {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        const jsonResponse = await response.json();
        const foundTracks = jsonResponse.tracks; 
        console.log(foundTracks);
        if(response.ok) {
            return foundTracks.items.map(track => (
                {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }
            ));          
        } else {
            return [];
            
        }
    } catch(error) {
        console.log('Error Searching Tracks:', error);
    }
}
const createPlaylist = async(name, user_id, accessToken) => {
    const data = JSON.stringify({
        name: name,
        public: false
    })
    try {
        const response = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
            method: 'POST',
            body: data,
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        if(response.ok) {
            const jsonResponse = await response.json();
            const playlistID = jsonResponse.id;
            return playlistID;
        }
    } catch(error) {
        console.log('Error creating playlist:', error);
    }
}

const addPlaylistTracks = async(playlist_id, tracks, accessToken, user_id) => {
    const data = JSON.stringify({
        uris: tracks.map(track => (track.uri)),
        position: 0
    });
    try {
        const response = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`, {
            method: "POST",
            body: data,
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        if(response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        }
    } catch(error) {
        console.log('Error adding tracks:', error);
    }
}

const getUserId = async(accessToken) => {
    try {
        const result = await fetch("https://api.spotify.com/v1/me", {
         headers: { Authorization: `Bearer ${accessToken}` }
        });

        let profile =  await result.json();
        let user_id = profile.id;
        console.log(user_id);
        return user_id;
    } catch(error) {
        console.log("Failed to get user_id:", error);
    }
}

const saveTracks = async(name, tracks) => {
    const accessToken = await authorizeSpotify();
    const user_id = await getUserId(accessToken);
    const playlistID = await createPlaylist(name, user_id, accessToken);
    if(playlistID) {
        const addTracksResponse = await addPlaylistTracks(playlistID, tracks, accessToken, user_id);
        if(addTracksResponse && addTracksResponse.snapshot_id) {
            console.log("Tracks added successfully");
            window.location.reload();
            alert('Playlist added');
        } else {
            console.log("Failed to add tracks to the playlist.");
        }
    } else {
        console.log("Failed to create playlist");
    }
}
    
export { searchTracks, saveTracks }; 
