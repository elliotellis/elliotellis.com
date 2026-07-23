# elliotellis.com

- Design/dev portfolio website for myself
- Online at https://elliotellis.com
- Built with SvelteKit
- Gets JSON data from a server hosting Kirby as a headless CMS
- Still very much a work in progress!

### To do

- Improve Work open/close interaction, either by making the active work independent of the gallery thumbnails, or by waiting for the right image to load before updating the state, to prevent the awkward layout shift 
  - As much as I want to keep the inline open works, it feels like the most straightforward solution will be the most boring 'normal' way to do it, like a modal on top. But there might be a way for me to make that feel a bit fresh.
- Fix videos with audio not appearing on iOS – seemingly only route at this point is to only supply videos without audio, and supply the audio track separately with an audio tag, syncing them with state
- Hide mute toggle for videos without sound
- Add fallback size options on elements that use round(), for browsers that don't support it yet
- Change all vw/vh units to svw/svh to prevent layout shifting when scrolling on mobile browsers