import { defineStore } from 'pinia'
export const Stores_Posts = defineStore('posts',{
    actions : {
        Index(params){
            return new Promise((resolve, reject) => {
                axios.get('posts').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Show(slug){
            return new Promise((resolve, reject) => {
                axios.get('posts/'+slug).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
    },




})