import { defineStore } from 'pinia'
export const Stores_Plans = defineStore('plans',{
    actions : {
        Active(){
            return new Promise((resolve, reject) => {
                axios.get('users/plans/active').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        }
    },




})