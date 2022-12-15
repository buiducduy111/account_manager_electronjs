<template>
    <div class="login-container">
        <div class="login-container__content" v-show="!loginSuccess">
            <h1>ENTER YOUR PIN</h1>
            <span>By default, the password is 123456</span>
            <br/>

            <input class="form-control" type="password" v-model="pin"/>
        </div>
        <div class="login-container__loading" v-if="loginSuccess">
            <div class="spinner-border text-secondary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'LoginPage',
    data() {
        return {
            pin: '',
            realPin : '',
            loginSuccess: false
        }
    },
    watch: {
        pin(oldPin, newPin) {
            this.checkLogin();
        }
    },
    methods: {
        checkLogin(){
            if (this.pin == this.realPin){
                this.loginSuccess = true;

                setTimeout(() => {
                    this.$router.push('/main');
                }, 1000);
                
            }
        }
    },
    async mounted() {
        this.realPin = await window.database.getPin();
        console.log(this.realPin);
    }
}
</script>

<style scoped>
    .login-container {
        margin: 100px auto;
        max-width: 500px;
        text-align: center;
    }
</style>