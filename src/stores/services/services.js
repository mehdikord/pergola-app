import { defineStore } from 'pinia'
export const Stores_Services = defineStore('service',{
    actions : {
        Coloring_Create(items){
            return new Promise((resolve, reject) => {
                axios.post('/users/services/coloring',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },

    },




})