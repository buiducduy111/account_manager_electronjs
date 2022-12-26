<template>
    <div class="container">
        <form @submit="addWebsiteToDatabase">
            <h1>New website</h1>
            <hr/>
            <label>Website URL</label>
            <div class="check-container">
                <a id="checkBtn" @click="checkWebsite">Check</a>
                <div class="spinner-grow spinner-grow-sm text-primary" role="status" v-show="isOnCheckingWebsite">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <input class="form-control" placeholder="Website url" v-model="website.url" />
            
            <br/>
            <label>Name on list</label>
            <input class="form-control" placeholder="Name on list" v-model="website.name"/>
            <br/>

            <label>Icon path or url</label>
            <input class="form-control" placeholder="Icon" v-model="website.icon"/>
            <br/>
            <button type="submit" class="btn btn-primary">Add</button>

            <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
        </form>
        
    </div>
</template>

<script>
/* eslint-disable */ 
export default {
    name: 'AddWebsite',
    data(){
        return {
            website: {},
            isOnCheckingWebsite: false
        }
    },
    methods: {
        async checkWebsite(){
            this.isOnCheckingWebsite = true;
            try {
                this.website.icon = await window.automation.getIcon(this.website.url);
                const urlObj = new URL(this.website.url);
                this.website.name = urlObj.hostname;
            } catch {

            }
            
            this.isOnCheckingWebsite = false;
        },
        async addWebsiteToDatabase(){
            try {
                const result = await window.database.addWebsite(JSON.stringify(this.website));
                this.$emit('onSuccess', result[0]);
                this.website = {};
            } catch {
                window.system.showMsg('Website is existed');
                this.$emit('close');
            }
        },
        closeModal() {
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

#checkBtn {
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 14px;
    cursor: pointer;
    color: #009FEC;
    display: inline-block;
    font-weight: 600;
    text-decoration: none;
    margin-right: 10px;
}

.check-container {
    display: inline-block;
    margin-left: 10px;
}
</style>