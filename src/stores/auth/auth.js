import { defineStore } from 'pinia'
export const Stores_Auth = defineStore('auth',{
    state : ()=>({
        user : null,
        token : null
    }),
    actions : {
        AuthLogin(user,token){
            this.user = user;
            this.token = token
            localStorage.setItem('pergola_token', token)
            localStorage.setItem('pergola_user', JSON.stringify(user));
        },
        AuthLogout(){
            this.user = null;
            this.token = null
            localStorage.removeItem('pergola_token')
            localStorage.removeItem('pergola_user');
        },
        AuthSyncData(){
            if (localStorage.getItem('pergola_token')){
                this.token = localStorage.getItem('pergola_token');
            }
            if (localStorage.getItem('pergola_user')){
                this.user = JSON.parse(localStorage.getItem('pergola_user'));
            }
        }
    },
    getters :{
        AuthGetUser(){
            return this.user;
        },
        AuthGetToken(){
            return this.token;
        },
        AuthGetCheckAuth(){
            return !!this.token;
        }
    }




})