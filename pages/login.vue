<template>
  <div class="hero is-fullwidth is-fullheight">
    <div class="hero-body columns is-centered">
      <div class="column is-centered is-two-fifths">
        <div class="box mt-4">
          <div class="box has-text-centered">
          <img src="https://www.aclcbukidnon.com/Account/ACLCLogo.png" class="custom-img" alt />
          
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

          <b-field label="" class="has-text-centered mt-4">
            <b-checkbox class="">Remember me?</b-checkbox>
          </b-field>

          <b-field label="" class="">
            <b-button
              @click="userLogin"
              type="is-primary"
              class="is-fullwidth is-medium"
            >
              Login
            </b-button>
          </b-field>
          <b-field label="" class="has-text-centered">
            <nuxt-link to="Login">Forgot Password?</nuxt-link>
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

<style  lang="scss" scoped>
.custom-img{
  height: 150px;
}


</style>

