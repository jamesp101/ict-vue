<template lang="pug">
.card.mr-4.pt-4.mt-2(@click="click")
  p.card-header-title
    | {{ title }}
  p.ml-4 {{ section }}
  p.ml-4 {{ teacher }}
  footer.card-footer
    .card-footer-item
      p Students: {{ footer }}
    .card-footer-item
      p {{ schedule }}
</template>

<script>
export default {
  props: {
    title: String,
    footer: Number,
    teacher: String,
    schedule: String,
    yearLevel: String,
    section: String,
    to: { type: String, default: "" },
  },
  methods: {
    click() {
      this.$router.push({ path: "./class?id=" + this.to });
    },
  },
};
</script>
