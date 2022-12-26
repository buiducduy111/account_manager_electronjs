<template>
    <div class="main-container">
        <!-- Websites -->
        <div class="website-container">
            <div class="website-container__menu">
                <div class="d-flex search-wrapper">
                    <span><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></span>
                    <input placeholder="Search website..." v-model="searchWebsite"/>
                </div>
                
            </div>
            <div class="website-container__list">
                <ul>
                    <li :class="{active : (website == selectedWebsite)}" v-for="website in data.websites" v-bind:key="website" @click="websiteClicked(website)">
                        <div class="website-item">
                            <div class="website-item__icon">
                                <img :src="website.src" />
                            </div>
                            <div class="website-item__content">
                                <span class="website-item__content__name">{{ website.name }}</span>
                                <span class="website-item__content__url">{{ website.url }}</span>
                            </div>
                            
                        </div>
                    </li>
                </ul>
            </div>
            <a class="a-btn" @click="showAddWebsiteModal"><font-awesome-icon icon="fa-solid fa-plus" /> Add website</a>
        </div>

        <!-- Accounts -->
        <div class="account-container">
            <div class="account-container__header">
                <div class="header__logo">
                    <img :src="selectedWebsite.src"/>
                </div>
                <div class="header__content">
                    <h1>{{selectedWebsite.name}}</h1>
                    <a class="website_func" @click="showEditWebsiteModal"><font-awesome-icon icon="fa-regular fa-pen-to-square" /> Edit</a>
                    <a class="website_func" @click="deleteWebsiteOnDatabase"><font-awesome-icon icon="fa-regular fa-trash-can" /> Delete</a>
                </div>
            </div>
            
            <a @click="showAddAccountModal" class="a-btn"><font-awesome-icon icon="fa-solid fa-plus" /> Add account</a>
            <br/>
            <table class="table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th width="200px">Password</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="account in data.accounts" :key="account">
                        <td>{{account.username}}</td>
                        <td><span>********</span> <span class="showPasswordBtn" @click="showPassword(account.password, $event)"><font-awesome-icon icon="fa-regular fa-eye"/></span></td>
                        <td>
                            <a @click="showEditAccountModal(account, false)" class="website_func"><font-awesome-icon icon="fa-solid fa-circle-info" /></a>
                            <a @click="showEditAccountModal(account, true)" class="website_func"><font-awesome-icon icon="fa-regular fa-pen-to-square" /></a>
                            <a @click="deleteAccountOnDatabase(account)" class="website_func"><font-awesome-icon icon="fa-regular fa-trash-can" /></a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="table-loading-layout" v-show="state.isLoadingData">
                <div class="d-flex justify-content-center">
                    <div class="spinner-border spinner-border-sm m-3" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="popup" v-show="state.isShowAddWebsiteModal | state.isShowEditWebsiteModal | state.isShowAddAccountModal | state.isShowEditAccountModal">
            <Transition name="bounce">
                <AddWebsite v-show="state.isShowAddWebsiteModal" @onSuccess="addWebsiteSuccessfully" @close="closeAllModals"></AddWebsite>
            </Transition>
            <Transition name="bounce">
                <EditWebsite ref="editWebsiteModal" v-show="state.isShowEditWebsiteModal" @onSuccess="closeAllModals" @close="closeAllModals"></EditWebsite>
            </Transition>
            <Transition name="bounce">
                <AddAccount ref="addAccountModal" v-show="state.isShowAddAccountModal" @onSuccess="addAccountSuccessfully" @close="closeAllModals"></AddAccount>
            </Transition>
            <Transition name="bounce">
                <EditAccount ref="editAccountModal" v-show="state.isShowEditAccountModal" @onSuccess="closeAllModals" @close="closeAllModals"></EditAccount>
            </Transition>
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
                isShowEditAccountModal: false,
                isLoadingData: false
            },
            selectedWebsite: {},
            searchWebsite: ''
        }
    },
    methods: {
        // Website ------------------------------------------------------------
        async websiteClicked(website){
            this.state.isLoadingData = true;
            this.selectedWebsite = website;
            this.data.accounts = await window.database.getAccounts(website.id);
            this.$refs.addAccountModal.setWebsiteId(website.id);

            setTimeout(() => {
                this.state.isLoadingData = false;
            }, 200);
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
            const dialog = await window.system.showConfirm('Do you want delete this website?');

            if (dialog == 1){
                try {
                    const result = await window.database.delWebsite(this.selectedWebsite.id);
 
                    if (result == true){
                        const index = this.data.websites.findIndex(item => item.id == this.selectedWebsite.id);
                        this.data.websites.splice(index, 1);
                    }
                } catch {}
                
            }
        },

        // Accounts -----------------------------------------------------------
        showAddAccountModal(){
            this.state.isShowAddAccountModal = true;
        },
        addAccountSuccessfully(account){
            this.state.isLoadingData = true;
            this.data.accounts.push(account);
            this.closeAllModals();

            setTimeout(() => {
                this.state.isLoadingData = false;
            }, 200);
        },
        showEditAccountModal(account, showUpdateButton){
            this.$refs.editAccountModal.updateCanUpdateStatus(showUpdateButton);
            this.$refs.editAccountModal.updateAccountObj(account);
            this.state.isShowEditAccountModal = true;
        },
        async deleteAccountOnDatabase(account){
            const dialog = await window.system.showConfirm('Do you want delete this account?');
            if (dialog == 1){
                try {
                    const result = await window.database.delAccount(account.id);

                    if (result == true){
                        this.state.isLoadingData = true;
                        const index = this.data.accounts.findIndex(item => item.id == account.id);
                        this.data.accounts.splice(index, 1);
                        setTimeout(() => {
                            this.state.isLoadingData = false;
                        }, 200);
                    }
                }
                catch {}
            }
        },
        showPassword(password, event){
            const target = event.currentTarget.parentElement.children[0];
            event.currentTarget.style.display = 'none';
            target.innerHTML = password;
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

        if (this.data.websites.length > 0)
            await this.websiteClicked(this.data.websites[0]);
    },
    watch: {
        async searchWebsite(){
            this.data.websites = await window.database.getWebsites(this.searchWebsite);
        },
        async websites(){
            alert('a');
        }
    }
}
</script>

<style scoped>
    .main-container {
        display: flex;
    }

    /* Website --------------------------------------------------*/
    .website-container {
        width: 330px;
        height: 100vh;
        padding: 15px
    }

    .website-container__menu {
        padding-bottom: 15px;
        padding-top: 5px;
        display: flex;
    }

    .website-container__menu input {
        flex: 1;
    }

    .website-container__list {
        height: calc(100vh - 125px);
        overflow-y: scroll;
    }
    .website-container__list ul {
        list-style-type: none;
        padding: 0px;
    }

    .website-container__list li {
        display: block;
        padding: 10px 15px;
        height: 60px;
        border-radius: 10px;
        cursor: pointer;
        margin-bottom: 5px;
        margin-right: 5px;
    }

    .website-container__list li:hover {
        background :#97CBFF;
    }

    .website-container__list .active {
        background :#E9E9E9;
    }

    .website-item {
        display: flex;
        
    }

    .website-item__icon {
        width: 50px;
    }

    .website-item__icon img {
        margin-top: 5px;
        width: 30px;
        height: 30px;
        display: block;
    }

    .website-item__content {
        flex: 1;
    }
    
    .website-item__content__name { 
        font-weight: 600;
        display: block;
        color: #454545;
    }

    .website-item__content__url {
        font-size: 14px;
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

    /* Account --------------------------------------------------*/
    .account-container {
        padding: 25px 15px 15px 15px;
        position: relative;
    }

    .table-loading-layout {
        position: absolute;
        top: 183px;
        width: calc(100% - 25px);
        height: calc(100vh - 200px);
        background: white;
    }

    .account-container__header {
        display: flex;
    }

    .header__logo {
        width: 50px;
        height: 50px;
    }

    .header__logo img {
        width: 50px;
    }

    .header__content {
        padding-left: 15px;
    }
    .header__content h1 {
        font-size: 21px;
        font-weight: 600;
    }
    .account-container {
        flex: 1;
    }

    .website_func {
        cursor: pointer;
        font-size: 14px;
        text-decoration: none;
        padding-right: 10px;
        color: #484848;
    }

    .showPasswordBtn {
        cursor: pointer;
    }

    .popup {
        position: fixed;
        left: 0px;
        top: 0px;
        width: 100vw;
        height: 100vh;
        background: rgba(64, 64, 64, 0.7);
    }

    /* width */
    ::-webkit-scrollbar {
    width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #D8D8D8;
        border-radius: 5px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #C1C1C1;
    }

    .bounce-enter-active {
        animation: bounce-in 0.25s;
        }
    .bounce-leave-active {
        animation: bounce-in 0.25s reverse;
    }
    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
    }

    /* Search components */
    .search-wrapper {
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        padding: 5px 10px 5px 10px;
        width: 100%;
    }

    .search-wrapper input {
        flex: 1;
        padding-left: 15px;
        border: none;
        outline: none;
        font-size: 13px;
    }

    .search-wrapper input:active {
        border: none;
    }
</style>