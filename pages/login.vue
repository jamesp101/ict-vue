<template>
  <div class="hero is-fullwidth is-fullheight has-background-dark">
    <div class="hero-body columns is-centered">
      <div class="column is-centered is-offset-6 is-two-fifths">
        <div class="box mt-4">
          <div class="box has-text-centered">
          <img src="/ICTManual/images/vnhs.png" class="custom-image"  alt />
          </div>
          <div class="has-text-centered">
            <h1 class="is-size-4"> <b>VNHS Login Page</b> </h1>
          </div>

          <b-field label="Login" />

          <b-input
            icon="account"
            value
            maxlength="40"
            placeholder="Username"
            v-model="login.username"
          />
          <b-input
            icon="lock"
            type="password"
            value
            password-reveal
            placeholder="Password"
            v-model="login.password"
          />


          <b-field label="" class="mt-6">
            <b-button
              @click="userLogin"
              type="is-primary"
              class="is-fullwidth is-medium"
            >
              Login
            </b-button>
          </b-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Login"
    };
  },
  data() {
    return {
      login: { username: "admin", password: "admin" }
    };
  },
  methods: {
       userLogin() {
         this.$auth.loginWith("local", {data: this.login}) .then(it=>{

            console.log("RESPONSE" , it)
            this.$router.push("app/dashboard");
              this.$buefy.toast.open({
                  duration: 5000,
                  message: `Successfuly logged in`,
                  position: 'is-bottom',
                  type: 'is-success'
              })
          })
          .catch(err=>{
              console.error(err)
              this.$buefy.toast.open({
                  duration: 5000,
                  message: `Username or password not found`,
                  position: 'is-bottom',
                  type: 'is-danger'
              })
          })
      }
  },
  watch: {
    internalValue(v) {
      this.$emit("input", v);
    }
  }
};
</script>

<style  scoped>
.custom-image{
  height:10rem;
}
</style>

