<script>
  let { video, image, muted, toggleMuted } = $props();
  let time = $state();
  let duration = $state();
</script>

<div class="video-interface">
  <div class="video-wrapper">
    <video 
      poster={image.srcPoster}
      loading="lazy"
      bind:muted
      bind:currentTime={time}
      bind:duration
      loop autoplay playsinline
      disablepictureinpicture
    >
      <source {src} type="video/webm">
      <Image data={image} />
    </video>
  </div>

  <div class="media-duration">
    <div class="media-progress" style:--progress={(time / duration) * 100 + '%'}></div>
  </div>

  <div class="media-controls">
    <button onclick={toggleMuted}>{muted ? 'Turn sound on' : 'Turn sound off'}</button>
  </div>
</div>

<style>

  video {
    display: block;
    width: 100%;
    height: auto;
  }

</style>