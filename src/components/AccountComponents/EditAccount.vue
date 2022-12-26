<template>
    <div class="container">
        <form @submit="updateAccountToDatabase">
            <h1>{{ title }}</h1>
            <hr/>
            <label>Username</label>
            <input class="form-control" placeholder="User name" v-model="account.username" />
            <br/>
            <label>Password</label>
            <input class="form-control" placeholder="Password" v-model="account.password"/>
            <br/>
            <label>More info</label>
            <textarea class="form-control" placeholder="More infomation" v-model="account.more_info"></textarea>
            <br/>
            <button type="submit" class="btn btn-primary" v-show="showUpdateButton">Update</button>

            <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'EditAccount',
    data(){
        return {
            account: {},
            showUpdateButton: false,
            title: 'Edit account'
        }
    },
    methods: {
        updateAccountObj(account){
            this.account = account;
        },
        updateCanUpdateStatus(isShowUpdateButton){
            if (isShowUpdateButton === true) this.title = 'Edit account';
            else this.title = "Details";

            this.showUpdateButton = isShowUpdateButton;
        },
        async updateAccountToDatabase(){
            try {
                await window.database.updateAccount(JSON.stringify(this.account));
                this.$emit('close');
            } catch {
                window.system.showMsg('Unknow error. Please try again!');
                this.$emit('close');
            }
        },
        closeModal(){
            this.$emit('close');
        }
    }
}
</script>

<style scoped>
.container {
    background: white;
    max-width: 700px;
    margin: 50px auto;
    border-radius: 10px;
    border: 1px solid #CECECE;
    padding: 15px;
    position: relative;
}

h1 {
    font-size: 23px;
}

textarea {
    height: 200px;
}

.btn-close {
    position: absolute;
    top: 15px;
    right: 15px;
}
</style>