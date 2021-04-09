<template>
  <div class="rows">
    <div class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img src="https://bulma.io/images/placeholders/128x128.png" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>Person</strong>
            <small>date</small>
            <br />LoremIpsum
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: String,
    person: String,
    commentDate: String,
    description: String,
  },
};
</script>

<style>
</style>
