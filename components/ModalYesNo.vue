<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{{title}}</p>
      <button type="button" class="delete" @click="clickClose"></button>
    </header>
    <b-field :label="label">
      <b-button :type="yesType" :label="yesLabel" @click="clickYes"></b-button>
      <b-button :type="noType" :label="noLabel" @click="clickNo"></b-button>
    </b-field>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    label: String,
    yesLabel: {
      type: String,
      default: "Yes",
    },
    noLabel: {
      type: String,
      default: "No",
    },
    yesType: {
      type: String,
      default: "is-primary",
    },
    noType: {
      type: String,
      default: "",
    },
  },
  methods: {
    clickClose() {
      console.log("CLOSE");
      this.$emit("clickClose", true);
    },
    clickYes() {
      this.$emit("clickYes", true);
    },
    clickNo() {
      this.$emit("clickNo", true);
    },
  },
};
</script>
