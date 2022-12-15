<template>
    <div class="main-container">
        <!-- Websites -->
        <div class="website-container">
            <button class="btn btn-primary" @click="showAddWebsiteModal">Add website</button>
            <input class="form-control" placeholder="Search website..." v-model="searchWebsite"/>

            <div class="website-container__list">
                <ul>
                    <li v-for="website in data.websites" v-bind:key="website.id" @click="websiteClicked(website)">
                        <div>
                            <img :src="website.icon" />
                            <span>{{ website.name }}</span>
                            <span>{{ website.url }}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Accounts -->
        <div class="account-container">
            <img :src="selectedWebsite.icon"/>
            <h1>{{selectedWebsite.name}}</h1>
            <a @click="showEditWebsiteModal">Edit</a>
            <a @click="deleteWebsiteOnDatabase">Delete</a>

            <br/>
            <button @click="showAddAccountModal">Add account</button>
            <br/>
            <div v-for="account in data.accounts" v-bind:key="account.id">
                <span>{{account.username}}</span>
                <br/>
                <span>{{account.password}}</span>
                <br/>
                <a @click="showEditAccountModal(account)">Edit</a>
                <a @click="deleteAccountOnDatabase(account)">Delete</a>

            </div>
        </div>

        <div class="popup" v-show="state.isShowAddWebsiteModal | state.isShowEditWebsiteModal | state.isShowAddAccountModal | state.isShowEditAccountModal">
            <AddWebsite v-show="state.isShowAddWebsiteModal" @onSuccess="addWebsiteSuccessfully" @close="closeAllModals"></AddWebsite>
            <EditWebsite ref="editWebsiteModal" v-show="state.isShowEditWebsiteModal" @onSuccess="closeAllModals" @close="closeAllModals"></EditWebsite>
            <AddAccount ref="addAccountModal" v-show="state.isShowAddAccountModal" @onSuccess="addAccountSuccessfully" @close="closeAllModals"></AddAccount>
            <EditAccount ref="editAccountModal" v-show="state.isShowEditAccountModal" @onSuccess="closeAllModals" @close="closeAllModals"></EditAccount>
        
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import AddWebsite from '../components/WebsiteComponents/AddWebsite.vue'
import EditWebsite from '../components/WebsiteComponents/EditWebsite.vue'
import AddAccount from '../components/AccountComponents/AddAccount.vue'
import EditAccount from '../components/AccountComponents/EditAccount.vue'

export default {
    name: 'MainPage',
    components: {
        AddWebsite,
        EditWebsite,
        AddAccount,
        EditAccount
    },
    data() {
        return {
            data: {
                websites: [],
                accounts: []
            },
            state: {
                isShowAddWebsiteModal: false,
                isShowEditWebsiteModal: false,
                isShowAddAccountModal: false,
                isShowEditAccountModal: false
            },
            selectedWebsite: {},
            searchWebsite: ''
        }
    },
    methods: {
        // Website ------------------------------------------------------------
        async websiteClicked(website){
            this.selectedWebsite = website;
            console.log(website.id);
            this.data.accounts = await window.database.getAccounts(website.id);
            this.$refs.addAccountModal.setWebsiteId(website.id);
        },
        showAddWebsiteModal(){
            this.state.isShowAddWebsiteModal = true;
        },
        addWebsiteSuccessfully(website){
            this.data.websites.push(website);
            this.closeAllModals();
        },
        showEditWebsiteModal(){
            this.$refs.editWebsiteModal.updateWebsiteObj(this.selectedWebsite);
            this.state.isShowEditWebsiteModal = true;
        },
        async deleteWebsiteOnDatabase(){
            if (confirm('Do you want delete this website?')){
                const result = await window.database.delWebsite(this.selectedWebsite.id);
                console.log(result);
                if (result == true){
                    const index = this.data.websites.findIndex(item => item.id == this.selectedWebsite.id);
                    console.log(index);
                    this.data.websites.splice(index, 1);
                }
            }
        },

        // Accounts -----------------------------------------------------------
        showAddAccountModal(){
            this.state.isShowAddAccountModal = true;
        },
        addAccountSuccessfully(account){
            this.data.accounts.push(account);
            this.closeAllModals();
        },
        showEditAccountModal(account){
            this.$refs.editAccountModal.updateAccountObj(account);
            this.state.isShowEditAccountModal = true;
        },
        async deleteAccountOnDatabase(account){
            if (confirm('Do you want delete this account?')){
                const result = await window.database.delAccount(account.id);

                if (result == true){
                    const index = this.data.accounts.findIndex(item => item.id == account.id);
                    console.log(index);
                    this.data.accounts.splice(index, 1);
                }
            }
        },

        // Helpers ------------------------------------------------------------
        closeAllModals() {
            this.state.isShowAddWebsiteModal = false;
            this.state.isShowEditWebsiteModal = false;
            this.state.isShowAddAccountModal = false;
            this.state.isShowEditAccountModal = false;
        }
    },
    async mounted() {
        this.data.websites = await window.database.getWebsites();
        console.log(this.data.websites);
    },
    watch: {
        async searchWebsite(){
            console.log(this.searchWebsite);
            this.data.websites = await window.database.getWebsites(this.searchWebsite);
        }
    }
}
</script>

<style scoped>
    .popup {
        position: fixed;
        left: 0px;
        top: 0px;
        width: 100vw;
        height: 100vh;
        background: rgba(64, 64, 64, 0.7);
    }
</style>