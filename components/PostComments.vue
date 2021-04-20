<template>
  <div class="box">
    <p class="is-size-6">
      <b>{{commenter}}</b>
    </p>
    <vue-moments-ago prefix="posted" suffix="ago" :date="datePosted" lang="en" />
    <template v-if="!isEdit">
      <p>{{commentBind}}</p>
      <div v-if="canEdit || isEdit">
        <b-button type="is-primary is-light" @click="clickEdit" icon-left="pencil"></b-button>
        <b-button type="is-danger is-light" @click="clickDelete" icon-left="trash-can"></b-button>
      </div>
    </template>
    <div v-if="isEdit">
      <b-input v-model="commentBind" type="textarea" maxlength="10000" rows="2"></b-input>
      <b-button type="is-primary" label="Edit" @click="clickEditSave"></b-button>
      <b-button type="is-primary is-light" @click="clickEditClose" icon-left="close"></b-button>
    </div>
  </div>
</template>
<script>
import VueMomentsAgo from "vue-moments-ago";
export default {
  components: { VueMomentsAgo },
  props: {
    postId: String,
    comment: String,
    commentId: String,
    userId: String,
    commenter: String,
    datePosted: String,
  },

  data() {
    return {
      canEdit: false,
      isEdit: false,
      commentBind: this.comment,
    };
  },
  created() {
    const isAdmin = this.$auth.user.message.access == 4;
    const userId = this.$auth.user.message.id == this.userId;
    if (isAdmin || userId) {
      this.canEdit = true;
    }
    console.log(`comment`, this.postId);
  },

  methods: {
    clickEdit() {
      this.isEdit = true;
    },
    clickEditClose() {
      this.isEdit = false;
      this.commentBind = this.comment;
    },
    async clickEditSave() {
      console.log(this.commentId);
      try {
        const res = await this.$axios.put(`/post/${this.postId}/comments`, {
          commentId: this.commentId,
          title: this.commentBind,
        });
        this.$buefy.notification.open({
          type: "is-success",
          message: "Post edited",
          hasIcon: true,
        });
        this.$emit("onChange", true);
      } catch (e) {
        console.error(e);
        this.$buefy.notification.open({
          type: "is-danger",
          message: "Something went wrong",
          hasIcon: true,
        });
      }
    },
    async clickDelete() {
      if (!confirm("Confirm delete post?")) {
        return;
      }
      console.log(`/post/${this.postId}/comments/${this.commentId}`);
      const res = await this.$axios.delete(
        `/post/${this.postId}/comments/${this.commentId}`
      );

      this.$buefy.notification.open({
        type: "is-success",
        message: "Post deleted",
        hasIcon: true,
      });
      this.$emit("onChange", true);
    },
  },
};
</script>

<style>
</style>
