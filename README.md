# Crowdplay - Crowdsource your playlist!


### What is it?
A web and mobile app that allows people to vote and add songs to a queue. The host creates a room and shares the link with their guest, the guests can then add or vote on the songs in queue. The host device would then simply play the songs in the music voted order.

### How do you use it?
[DEMO](http://crowdplay.ca)
- Make sure that you have either the Spotify web play or native app active as this app piggys back off those for playback
- To try it on your local machine, a simple git clone, and in the main directory run "npm build" then "npm start"

### How does it work?
Database:
- Firebase
  + Quick realtime updates for vote counts is 
  + Quick relatime updates for queue order changes, song additions, and deletions
  + Easily accesible database from both the web client and the native mobile client
  + Object oriented hierarchy worked out very nicely for each "virtual room/queue"

Backend:
- Node
- Spotify Web API
  - Oauth 2.0 for authentication

Frontend:
- React
