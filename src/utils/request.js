import axios from 'axios';

/**
 * [创建axios 实例]
 * @type {[type]}
 */
const service = axios.create({
    baseURL: process.env.ENV_CONFIG === 'dev' ? '/' : process.env.BASE_API,
    timeout: 10000
});

export default service;
