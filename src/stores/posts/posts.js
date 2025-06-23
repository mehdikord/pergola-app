import { defineStore } from 'pinia'
export const Stores_Posts = defineStore('posts',{
    actions : {
        Index(category){
            return new Promise((resolve, reject) => {
                axios.get('posts/'+category,).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Categories(params){
            return new Promise((resolve, reject) => {
                axios.get('post-categories').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Categories_Parents(params){
            return new Promise((resolve, reject) => {
                axios.get('post-categories-parent').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Categories_Children(params){
            return new Promise((resolve, reject) => {
                axios.get('post-categories/'+params.id).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Show(slug){
            return new Promise((resolve, reject) => {
                axios.get('posts/show/'+slug).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Category_Show(slug){
            return new Promise((resolve, reject) => {
                axios.get('posts/category/'+slug).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
    },




})