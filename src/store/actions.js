import * as types from './mutations-types';
import { requestLogin,
        requestLatestVideo,
        requestCommentListVideo,
        requestCommentVideo} from '@/api';
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
 * 查询影片列表
 *
 * @class      enquiriesVideoListAction (name)
 * @param      {Object}    arg1         The argument 1
 * @param      {Function}  arg1.commit  The commit
 * @param      {<type>}    params  The account data
 * @return     {Promise}   { description_of_the_return_value }
 */
export const enquiriesVideoListAction = ({commit}, params) => {
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

/**
 * 查询影片评论列表
 *
 * @class      enquiriesAction (name)
 * @param      {Object}    arg1         The argument 1
 * @param      {Function}  arg1.commit  The commit
 * @param      {<type>}    params  The account data
 * @return     {Promise}   { description_of_the_return_value }
 */
export const enquiriesCommentListVideo = ({commit}, params) => {
    return new Promise((resolve, reject) => {
        const model = loadFromLocal(null, 'logining', false);
        params.user = model.user;
        params.token = model.token;
        requestCommentListVideo(params).then((res) => {
            commit(types.SET_USER, model);
            resolve(res);
        }).catch(e => {
            console.log(e);
            resolve(e);
        });
    });
};

/**
 * 评论影片
 *
 * @class      commentVideoAction (name)
 * @param      {Object}    arg1         The argument 1
 * @param      {Function}  arg1.commit  The commit
 * @param      {<type>}    params  The account data
 * @return     {Promise}   { description_of_the_return_value }
 */
export const commentVideoAction = ({commit}, params) => {
    return new Promise((resolve, reject) => {
        const model = loadFromLocal(null, 'logining', false);
        params.user = model.user;
        params.token = model.token;
        requestCommentVideo(params).then((res) => {
            commit(types.SET_USER, model);
            resolve(res);
        }).catch(e => {
            console.log(e);
            resolve(e);
        });
    });
};

/**
 * 用于首界面传值给播放界面
 *
 * @class      commitVideoModelAction (name)
 * @param      {Object}    arg1         The argument 1
 * @param      {Function}  arg1.commit  The commit
 * @param      {<type>}    params  The account data
 * @return     {Promise}   { description_of_the_return_value }
 */
export const commitVideoModelAction = ({commit}, params) => {
    return new Promise((resolve, reject) => {
        saveToLocal(null, 'videoModel', params);
        commit(types.SET_VIDEOMODEL, params);
        resolve(params);
    });
};

/**
 * 播放界面刷新时从本地取
 *
 * @class      refreshVideoModelAction (name)
 * @param      {Object}    arg1         The argument 1
 * @param      {Function}  arg1.commit  The commit
 * @param      {<type>}    params  The account data
 * @return     {Promise}   { description_of_the_return_value }
 */
export const refreshVideoModelAction = ({commit}) => {
    return new Promise((resolve, reject) => {
        const videoModel = loadFromLocal(null, 'videoModel', false);
        commit(types.SET_VIDEOMODEL, videoModel);
        resolve(videoModel);
    });
};
