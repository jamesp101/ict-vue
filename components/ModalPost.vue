<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{{modalMessage}}</p>
      <button type="button" class="delete" @click="clickClose"></button>
    </header>
    <section class="modal-card-body">
        <markdown-editor v-if="content || isCreate" @textChange="textChange"  :content="content"/>
      <b-field class="is-pulled-right mt-4" type="is-large">

        <b-button v-if="isCreate" type="is-primary" label="Submit" @click="onClickSubmit" />
        <b-button v-else type="is-success" label="Save" @click="onClickSubmit" />
      </b-field>
    </section>
  </div>
</template>

<script>
import MarkdownEditor from "./MarkdownEditor.vue";
export default {
  props: {
    id: String,
    class_id: String,
    post_id: String,
    editorContent: String
  },
  data() {
    return {
      data: "",
      isCreate: true,
      modalMessage: "",
      content:""
    };
  },
  components: { MarkdownEditor },
   async created() {
    if (this.post_id == undefined){
      this.isCreate = true
      this.modalMessage = "Create new Post"
      return
    }
    this.isCreate = false
    this.modalMessage = "Edit Post"

    let data= await this.$axios.get(`/post/${this.post_id}`)
    this.content = data.data[0].title
    console.log(this.content)   
  },
  beforeDestroy() {},

  methods: {
    textChange(data) {
      this.data = data;
    },
    demo() {
      console.log(this.data);
    },
    clickClose() {
      this.$parent.close();
    },
    async newPost(e) {
      if(this.data == ''){
        this.$buefy.notification.open({
          type: 'is-danger',
          hasIcon: true,
          position: 'is-bottom-right',
          message: 'Your post cannot be empty'
        })
        return
      }
      try{
        const res = await this.$axios.$post("/post", {
          class: this.class_id,
          postedBy: this.id,
          title: this.data,
        });

        this.$buefy.notification.open({
          type: 'is-success',
          hasIcon: true,
          position: 'is-bottom-right',
          message: 'Post created'
        })
        this.$parent.close();
        return
      } catch {
        this.$buefy.notification.open({
          type: 'is-danger',
          hasIcon: true,
          position: 'is-bottom-right',
          message: 'Something went wrong'
        })
      }

    },
    checkIfEmpty(){

    },
    async updatePost(e){
      if(this.data == ''){
        this.$buefy.notification.open({
          type: 'is-warning',
          hasIcon: true,
          position: 'is-bottom-right',
          message: 'No changes were made'
        })
        return
      }
      const res = await this.$axios.$put(`/post/${this.post_id}`,
                        {
                          title: this.data
                        })
        this.$buefy.notification.open({
          type: 'is-success',
          hasIcon: true,
          position: 'is-bottom-right',
          message: 'Post Updated'
        })
      this.$parent.close()
    },
    async onClickSubmit(e){
      if (this.isCreate){
        this.newPost(e)
        return
      }      

      this.updatePost(e)
      return
      

    },
  },
};
</script>

<style scoped>
.modal-card {
  width: 100%;
}
.markdown-content {
  background: #fff;
  overflow: auto;
}
</style>
