import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:4040/",
    headers:{
        'Content-Type':'application/json'
    }
})

export const authAPI = {
    authMe() {
        return instance.get('/auth/me')
    },

    login(login, pass, rememberMe = false) {
        return instance.post(`/auth/login`, {login, pass, rememberMe})
    },

    logout(){
        return instance.delete(`/auth/logout`)    
    },

    registration(login, pass) {
        return instance.post(`/auth/registration`, {login, pass})
    }
}

export const usersAPI = {
    getUsers(){
        return instance.get('/users/get')
    },

    getUser(userId){
        return instance.get(`/users/get/${userId}`)
    },

    updateUser(vocs, image){
        return instance.put(`/users/update`, {vocs, image})
    }
}

export const vocsAPI = {
    getVocs(){
        return instance.get('/vocabulary/get')
    },

    getVocsByUserId(userId, page){
        return instance.get(`/vocabulary/user/${userId}?page=${page}`)
    },

    getVocById(vocId){
        return instance.get(`/vocabulary/get/${vocId}`)
    },

    getWordsByVocId(vocId, page){
        return instance.get(`/vocabulary/words/${vocId}?page=${page}`)
    },

    getWordsByVocsIds(vocIds){
        return instance.get(`/vocabulary/words?${"voc_id=" + vocIds.join("&voc_id=")}`)
    },

    createVoc(title, description, ownerId, ownerNickname, isPrivate){
        return instance.post(`/vocabulary/create`, {title, description, ownerId, ownerNickname, isPrivate})
    },

    deleteVoc(vocId){
        return instance.delete(`/vocabulary/delete/${vocId}`) 
    },

    updateVoc(vocId, title, description, isPrivate, wordsCount){
        return instance.put(`/vocabulary/update/${vocId}`, {title, description, isPrivate, wordsCount})
    }
}

export const wordsAPI = {
    createWord(voc_id, word_eng, word_ru){
        return instance.post(`/words/create`, {voc_id, word_eng, word_ru}) 
    },

    createWords(voc_id, words){
        return instance.post(`/words/create`, {voc_id, words})
    },

    updateWord(wordId, word_eng, word_ru){
        return instance.put(`/words/update/${wordId}`, {word_eng, word_ru})
    },

    deleteWord(wordId){
        return instance.delete(`/words/delete/${wordId}`) 
    }
}

export const ratingsAPI = {
    getRates(userId){
        return instance.get(`/ratings/get/${userId}`)
    },

    createRate(voc_id, userId, rate){
        return instance.post(`/ratings/create`, {voc_id, userId, rate})
    }
}