import { defineStore } from 'pinia'
export const Stores_Pages = defineStore('pages',{
    actions : {
        Show(slug){
            return new Promise((resolve, reject) => {
                axios.get('pages/'+slug).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
    },




})