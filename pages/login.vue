<template>
    <div class="hero is-fullwidth is-fullheight is-primary">
        <div class="hero-body columns is-centered">

            <div class="column is-centered is-two-fifths">
                <div class="box mt-4">
                    <div class="box has-text-centered">
                        <img class="" src="https://meqasa.com/fascimos/somics/download2.png" alt />
                    </div>

                        <b-field label="Login"/>
                        <b-input icon="account"
                                 value
                                 maxlength="40"
                                 placeholder="Username"
                                 v-model="login.username"
                        />
                        <b-input icon="lock"
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
                            > Login </b-button>
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
             title: "Login",

         }
     },
     data(){
         return {
             login:{username: '', password: ''},
         }
     },
     methods:{
         async userLogin(){
             // this.$axios.post('/auth/login',
             //                  {
             //                      username: this.email,
             //                      password: this.password
             //                  }
             // ).then(response => {
             //     console.log(response)
             // }).catch(err => console.log(err))
             console.log(this.login)
             try {
                 await this.$auth.loginWith('local', {
                     username: this.login.username,
                    password: this.login.password
                 })

             }catch(e){
                 console.log(e)
             }
         }

     },
     watch:{
         internalValue(v){
            this.$emit('input', v)
         }
     }

 }
</script>

<style scoped>
img {
  min-height: 250px;
  min-width: 250px;
}
</style>
