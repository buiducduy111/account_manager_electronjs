<template>
    <div class="container">
        <h1>New account</h1>

        <input class="form-control" placeholder="User name" v-model="account.username" />
        <a @click="checkWebsite">Check</a>

        <input class="form-control" placeholder="Password" v-model="account.password"/>
        <textarea class="form-control" placeholder="Icon" v-model="account.more_info"></textarea>
        <br/>
        <button class="btn btn-primary" @click="addAccountToDatabase">Add</button>
    </div>
</template>

<script>
export default {
    name: 'AddAccount',
    data(){
        return {
            account: {},
            websiteId: 0
        }
    },
    methods: {
        setWebsiteId(websiteId){
            this.websiteId = websiteId
        },
        async addAccountToDatabase(){
            try {
                this.account.website_id = this.websiteId;
                const result = await window.database.addAccount(JSON.stringify(this.account));
                this.$emit('onSuccess', result[0]);
                this.account = {};
            } catch {
                alert('Unknow error. Please try again!');
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