import axios from 'axios';
import config from './config';

/**
 * [创建axios 实例]
 * @type {[type]}
 */
const service = axios.create({
    baseURL: process.env.ENV_CONFIG === 'dev' ? '/' : process.env.BASE_API,
    timeout: 10000
});

/**
 * [统一拦截请求]
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
service.interceptors.request.use(cfg => {
    cfg.headers['Accept'] = config.map.headers.Accept || null;
    console.log(cfg);
    return cfg;
}, error => {
    console.log(error); // 打印测试
    Promise.reject(error);
});

/**
 * [统一拦截响应]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
service.interceptors.response.use(
    response => response,
    error => {
        console.log('error' + error); // 打印测试
        return Promise.reject(error);
    }
);

export default service;
