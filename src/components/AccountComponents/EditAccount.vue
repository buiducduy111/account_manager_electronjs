<template>
    <div class="container">
        <h1>Edit account</h1>

        <input class="form-control" placeholder="User name" v-model="account.username" />
        <a @click="checkWebsite">Check</a>

        <input class="form-control" placeholder="Password" v-model="account.password"/>
        <textarea class="form-control" placeholder="Icon" v-model="account.more_info"></textarea>
        <br/>
        <button class="btn btn-primary" @click="updateAccountToDatabase">Update</button>
    </div>
</template>

<script>
export default {
    name: 'EditAccount',
    data(){
        return {
            account: {}
        }
    },
    methods: {
        updateAccountObj(account){
            this.account = account;
            console.log(this.account);
        },
        async updateAccountToDatabase(){
            try {
                await window.database.updateAccount(JSON.stringify(this.account));
                this.$emit('close');
            } catch {
                alert('Unknow error. Please try again!');
                this.$emit('close');
            }
        }
    }
}
</script>

<style scoped>
.container {
    background: white;
}
</style>