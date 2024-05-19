import axios from 'axios'
import { getTokenFromLocalStorage } from '../helpers/localstorage.helper'

export const instance = axios.create({
    baseURL: 'https://frontend-test-assignment-api.abz.agency/api/v1',
    headers: {
        Authorization: 'Bearer ' + getTokenFromLocalStorage() || '',
    }
})