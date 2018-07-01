import * as types from './mutations-types';
import { requestLogin, requestLatestVideo } from '@/api';
import { saveToLocal, loadFromLocal } from '@/common/js/store.js';

/**
 * 异步登录
 *
 * @class      loginAction (name)
 * @param      {Object}    arg1         The argument 1
 * @param      {Function}  arg1.commit  The commit
 * @param      {<type>}    params  The account data
 * @return     {Promise}   { description_of_the_return_value }
 */
export const loginAction = ({commit}, params) => {
    return new Promise((resolve, reject) => {
        requestLogin(params).then(res => {
            const model = res.data;
            commit(types.SET_USER, model);
            saveToLocal(null, 'logining', model);
            resolve(res);
        }).catch(e => {
            console.log(e);
            resolve(e);
        });
    });
};

/**
 * 查询影片
 *
 * @class      enquiriesAction (name)
 * @param      {Object}    arg1         The argument 1
 * @param      {Function}  arg1.commit  The commit
 * @param      {<type>}    params  The account data
 * @return     {Promise}   { description_of_the_return_value }
 */
export const enquiriesAction = ({commit}, params) => {
    return new Promise((resolve, reject) => {
        const model = loadFromLocal(null, 'logining', false);
        params.user = model.user;
        params.token = model.token;
        requestLatestVideo(params).then((res) => {
            commit(types.SET_USER, model);
            resolve(res);
        }).catch(e => {
            console.log(e);
            resolve(e);
        });
    });
};
