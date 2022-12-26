<template>
    <div class="container">
        <form @submit="addAccountToDatabase">
            <h1>New account</h1>
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
            <button type="submit" class="btn btn-primary">Add</button>

            <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
        </form>
        
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
                window.system.showMsg('Unknow error. Please try again!');
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