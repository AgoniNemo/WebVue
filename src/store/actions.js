import * as types from './mutations-types';
import { requestLogin } from '@/api';
import {saveToLocal} from '@/common/js/store.js';

/**
 * 异步登录
 *
 * @class      LoginAction (name)
 * @param      {Object}    arg1         The argument 1
 * @param      {Function}  arg1.commit  The commit
 * @param      {<type>}    accountData  The account data
 * @return     {Promise}   { description_of_the_return_value }
 */
export const LoginAction = ({commit}, accountData) => {
    return new Promise((resolve, reject) => {
        requestLogin(accountData).then(res => {
            const model = res.data;
            commit(types.SET_USER, model);
            saveToLocal(model.user, 'logining', model);
            resolve(res);
        }).catch(e => {
            console.log(e);
            resolve(e);
        });
    });
};
