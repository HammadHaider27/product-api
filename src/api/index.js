import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://dummyjson.com'
})

// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN ? AUTH_TOKEN : null