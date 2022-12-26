<template>
    <div class="full-container" :style="{'background-image': 'url(' + require('../assets/img/login_bg.svg') + ')'}">
        <div class="login-container">
            <div class="login-container__content" v-show="!loginSuccess">
                <h1><font-awesome-icon icon="fa-regular fa-circle-user fa-7x" /></h1>
                <h1>ENTER YOUR PIN</h1>
                <small>By default, the password is 123456</small>
                <br/>

                <input class="form-control" type="password" v-model="pin"/>
                <router-link to="/change-pin" class="a-btn">Change your PIN</router-link>
                <br/><br/>
                <small style="color: #7A7A7A">If you want to auto update password from via chrome to this app, install our extensions (Load unpacked) at <b>resources/app-extension</b></small>
            </div>
            <div class="login-container__loading" v-if="loginSuccess">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
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
        const checkDatabase = await window.setting.checkDatabase();
        if (!checkDatabase)
            this.$router.push('/setting');
        else {
            await window.setting.initDatabase();
            this.realPin = await window.database.getPin();
        }
    }
}
</script>

<style scoped>
    .full-container {
        width: 100%;
        height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
    }

    .login-container {
        margin: 150px auto;
        max-width: 400px;
        height: 400px;
        text-align: center;
        border-radius: 10px;
        border: 1px solid #E1E1E1;
        padding: 35px 25px;
        background: rgba(255, 255, 255, 0.8);
    }

    .login-container__loading {
        margin-top: 100px;
    }

    .login-container__content h1 {
        font-size: 31px;
    }

    input {
        margin-top: 15px !important;
        text-align: center !important;
    }

    .a-btn {
        margin-top: 15px;
        margin-left: 15px;
        font-size: 14px;
        cursor: pointer;
        color: #009FEC;
        display: block;
        font-weight: 600;
        text-decoration: none;
    }

    .a-btn:hover {
        color: #4AC5FF;
    }

</style>