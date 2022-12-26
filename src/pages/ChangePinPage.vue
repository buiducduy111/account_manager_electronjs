<template>
    <div class="full-container" :style="{'background-image': 'url(' + require('../assets/img/login_bg.svg') + ')'}">
        <div class="setup-container">
            <h1>CHANGE YOUR PIN</h1>
            <router-link to="/" class="a-btn"><font-awesome-icon icon="fa-solid fa-angle-left" /> Back to Login page</router-link>
            <br/>
            <label>Current pin</label>
            <input class="form-control" type="password" v-model="currentPin"/>
            <br/>
            <label>New pin</label>
            <input class="form-control" type="password" v-model="newPin"/>
            <br/>
            <label>Re enter new pin</label>
            <input class="form-control" type="password" v-model="reEnterPin"/>
            <br/>
            <button class="btn btn-primary" @click="changePin">Change</button>
            <br/>
            
        </div>
    </div>
    
</template>

<script>
export default {
    name: 'ChangePinPage',
    data() {
        return {
            currentPin: '',
            newPin: '',
            reEnterPin: ''
        }
    },
    methods: {
        async changePin(){
            const dbPin = await window.database.getPin();
            if (dbPin != this.currentPin){
                await window.system.showMsg('Current PIN is wrong');
                return;
            } 

            if (this.newPin != this.reEnterPin){
                await window.system.showMsg('Re Enter password is wrong');
                return;
            }

            await window.database.setPin(this.newPin);
            await window.system.showMsg('Change PIN successfully');
            this.$router.push('/');
        }
    }
}
</script>

<style scoped>
.setup-container {
    width: 500px;
    margin: 100px auto;
    border-radius: 10px;
    border: 1px solid #E1E1E1;
    padding: 35px 25px;
    background: rgba(255, 255, 255, 0.8);
}

h1 {
    font-size: 24px;
}

.select-file-wrapper input {
    flex: 1;
}

.select-file-wrapper button {
    margin-left: 5px;
}


.a-btn {
    margin-top: 15px;
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

.full-container {
    width: 100%;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
}
</style>