const express = require("express");
const spotifyController = require("../controllers/spotify.controller.js");

const spotifyRouter = express.Router();
/* Routes for Spotify*/
spotifyRouter.get("/login", spotifyController.loginSpotify);
spotifyRouter.get("/auth", spotifyController.authSpotify);

module.exports = spotifyRouter;
