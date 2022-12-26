<template>
    <div class="full-container" :style="{'background-image': 'url(' + require('../assets/img/login_bg.svg') + ')'}">
        <div class="setup-container">
            <h1>SETUP</h1>
            <br/>
            <label>Choose save data location</label>
            <div class="d-flex select-file-wrapper">
                <input class="form-control" v-model="saveLocation"/>
                <button class="btn btn-secondary" @click="selectFolder">...</button>
            </div>
            <br/>
            <button class="btn btn-primary" @click="setup">Next</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SetupPage',
    data() {
        return {
            saveLocation: ''
        }
    },
    methods: {
        async setup(){
            const setDataLocationResult = await window.setting.setDataLocation(this.saveLocation);
            if (!setDataLocationResult){
                await window.system.showMsg('Save location is not exist!');
                return;
            }

            this.$router.push('/');
        },
        async selectFolder(){
            const result = await window.system.showOpenDialog('Select data location');
            this.saveLocation = result[0];
        }
    }
}
</script>

<style scoped>
.setup-container {
    width: 500px;
    margin: 150px auto;
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