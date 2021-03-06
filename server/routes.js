'use strict';

const Spotify = require('spotify-web-api-node');
const querystring = require('querystring');
const express = require('express');
const router = new express.Router();
// configure the express server
const CLIENT_ID = 'efb68c1445ae4ab783e0dcbed33c1f84';
const CLIENT_SECRET = '61afff17688e42d48952fd18d524eb1e';
const REDIRECT_URI = 'http://localhost:3000/callback';
const STATE_KEY = 'spotify_auth_state';

// your application requests authorization
const scopes = ["streaming", 'user-top-read', 'user-read-private', 'user-read-email', 'user-read-playback-state', 'user-modify-playback-state','playlist-modify-private', 'playlist-modify-public', 'playlist-read-private', 'playlist-read-collaborative'];

// configure spotify

const spotifyApi = new Spotify({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URI
});

let redirectToRoom = false;
let room;


/** Generates a random string containing numbers and letters of N characters */
const generateRandomString = N => (Math.random().toString(36)+Array(N).join('0')).slice(2, N+2);

/**
 * The /login endpoint
 * Redirect the client to the spotify authorize url, but first set that user's
 * state in the cookie.
 */
router.get('/login', (_, res) => {
  const state = generateRandomString(16);
  res.cookie(STATE_KEY, state);
  res.redirect(spotifyApi.createAuthorizeURL(scopes, state));
});



/**
 * The /callback endpoint - hit after the user logs in to spotifyApi
 * Verify that the state we put in the cookie matches the state in the query
 * parameter. Then, if all is good, redirect the user to the user page. If all
 * is not good, redirect the user to an error page
 */
router.get('/callback', (req, res) => {
  const { code, state } = req.query;
  const storedState = req.cookies ? req.cookies[STATE_KEY] : null;
  // first do state validation
  if (state === null || state !== storedState) {
    res.redirect('/#/error/state mismatch');
  // if the state is valid, get the authorization code and pass it on to the client
  } else {
    res.clearCookie(STATE_KEY);
    // Retrieve an access token and a refresh token
    spotifyApi.authorizationCodeGrant(code).then(data => {
      const { expires_in, access_token, refresh_token } = data.body;
      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);
      if(redirectToRoom === true && room !== 'logo.ico'){
        redirectToRoom = false
        res.redirect(`/#/${room}/${access_token}/${refresh_token}`)
      }
      res.redirect(`/#/user/${access_token}/${refresh_token}`);
    }).catch(err => {
      res.redirect('/#/error/invalid token');
    });
  }
});

router.get('/refreshToken', function(req,res) {
  console.log('caugh')
  spotifyApi.refreshAccessToken().then(function(data) {
    res.send(data.body['access_token'])
  }, function(err) {
    console.log('Could not refresh access token', err);
  });
})

router.get('/:tagId', function(req, res) {
  room = req.params.tagId
  if(room == null || room == "null"){
    return
  }
  if(room !== 'callback' || room !== 'login' || room !== 'refreshToken'){
      redirectToRoom = true;
      const state = generateRandomString(16);
      res.cookie(STATE_KEY, state);
      res.redirect(spotifyApi.createAuthorizeURL(scopes, state));
  }
});

module.exports = router;
