const axios = require("axios");

// Code from Spotify API
// https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
function loginSpotify(req, res) {
  const state = generateRandomString(16);
  const scope = "user-read-private user-read-email";

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
}

function getCallback(req, res) {
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (state === null) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization: "Basic " + base64(clientID + ":" + clientSecret),
      },
      json: true,
    };
  }
}

async function authSpotify(req, res) {
  const client_id = "829cb5438c7443429b292589e44dd040";
  const client_secret = "13107f54924f4297afef16c4f8111dac";
  const authHeaders = {
    Authorization: "Basic " + base64(clientID + ":" + clientSecret),
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const options = {
    hostname: "https://accounts.spotify.com/api/token",
    headers: authHeaders,
    form: { grant_type: "client_credentials" },
    json: true,
  };

  const requestOptions = {
    headers: authHeaders,
    body: options.form,
    redirect: "follow",
  };

  let response = await axios.post(options.hostname, requestOptions);

  response = await response.json();
  return response.access_token;
}

async function searchSpotify(req, res) {
  const access_token = await authSpotify();
  const BASE_URL = "https://api.spotify.com/v1/search";
  let FETCH_URL = `${BASE_URL}?q=${query}&type=artist&limit=1`;
  const ALBUM_URL = "https://api.spotify.com/v1/artists";

  const requestOptions = {
    headers: {
      authorization: `Bearer ${access_token}`,
    },
  };
  res = await axios.get(FETCH_URL, requestOptions);
  res = await res.json();
  console.log("Artist", res);
}

module.exports = { loginSpotify, authSpotify, searchSpotify, getCallback };
