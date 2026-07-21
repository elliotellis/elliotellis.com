# elliotellis.com

- Design/dev portfolio website for myself
- Online at https://elliotellis.com
- Built with SvelteKit
- Gets JSON data from a server hosting Kirby as a headless CMS
- Still very much a work in progress!

### To do

- Improve Work open/close interaction, either by making the active work independent of the gallery thumbnails, or by waiting for the right image to load before updating the state, to prevent the awkward layout shift
- Hide mute toggle for videos without sound
- Add fallback size options on elements that use round(), for browsers that don't support it yet
- Adjustments to BackgroundManager rate and colour values