<template>
    <div class="container">
        <h1>New website</h1>

        <input class="form-control" placeholder="Website url" v-model="website.url" />
        <a @click="checkWebsite">Check</a>

        <input class="form-control" placeholder="Name on list" v-model="website.name"/>
        <input class="form-control" placeholder="Icon" v-model="website.icon"/>
        <br/>
        <button class="btn btn-primary" @click="addWebsiteToDatabase">Add</button>
    </div>
</template>

<script>
export default {
    name: 'AddWebsite',
    data(){
        return {
            website: {}
        }
    },
    methods: {
        async checkWebsite(){
            this.website.icon = await window.automation.getIcon(this.website.url);
            const urlObj = new URL(this.website.url);
            this.website.name = urlObj.hostname;
        },
        async addWebsiteToDatabase(){
            try {
                const result = await window.database.addWebsite(JSON.stringify(this.website));
                this.$emit('onSuccess', result[0]);
                this.website = {};
            } catch {
                alert('Website is existed');
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