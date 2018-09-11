import * as types from './mutations-types';
import { requestLogin,
        requestLatestVideo,
        requestCommentListVideo,
        requestCommentVideo,
        requestCollectionListVideo,
        requestColStateVideo,
        requestModifyUserInfo,
        requestUploadImagePublic} from '@/api';
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
            commit(types.SET_ISTEST, (model.authority !== '1005'));
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
        commit(types.SET_ISTEST, (model.authority !== '1005'));
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
        const model = loadFromLocal(null, 'logining', false);
        commit(types.SET_ISTEST, (model.authority !== '1005'));
        commit(types.SET_VIDEOMODEL, videoModel);
        resolve(videoModel);
    });
};

/**
 * 用户收藏影片列表
 *
 * @class      collectionVideoListAction (name)
 * @param      {Object}    arg1         The argument 1
 * @param      {Function}  arg1.commit  The commit
 * @param      {<type>}    params  The account data
 * @return     {Promise}   { description_of_the_return_value }
 */
export const collectionVideoListAction = ({commit}, params) => {
    return new Promise((resolve, reject) => {
        const model = loadFromLocal(null, 'logining', false);
        params.user = model.user;
        params.token = model.token;
        requestCollectionListVideo(params).then((res) => {
            commit(types.SET_USER, model);
            commit(types.SET_ISTEST, (model.authority !== '1005'));
            resolve(res);
        }).catch(e => {
            console.log(e);
            resolve(e);
        });
    });
};

/**
 * 用户收藏影片
 *
 * @class      collectionVideoAction (name)
 * @param      {Object}    arg1         The argument 1
 * @param      {Function}  arg1.commit  The commit
 * @param      {<type>}    params  The account data
 * @return     {Promise}   { description_of_the_return_value }
 */
export const collectionVideoAction = ({commit}, params) => {
    return new Promise((resolve, reject) => {
        const model = loadFromLocal(null, 'logining', false);
        params.user = model.user;
        params.token = model.token;
        requestColStateVideo(params).then((res) => {
            commit(types.SET_USER, model);
            commit(types.SET_ISTEST, (model.authority !== '1005'));
            resolve(res);
        }).catch(e => {
            console.log(e);
            resolve(e);
        });
    });
};

/**
 * 修改用户信息
 *
 * @class      modifyUserInfoAction (name)
 * @param      {Object}    arg1         The argument 1
 * @param      {Function}  arg1.commit  The commit
 * @param      {<type>}    params  The account data
 * @return     {Promise}   { description_of_the_return_value }
 */
export const modifyUserInfoAction = ({commit}, params) => {
    return new Promise((resolve, reject) => {
        const model = loadFromLocal(null, 'logining', false);
        params.user = model.user;
        params.token = model.token;
        requestModifyUserInfo(params).then((res) => {
            commit(types.SET_USER, model);
            commit(types.SET_ISTEST, (model.authority !== '1005'));
            resolve(res);
        }).catch(e => {
            console.log(e);
            resolve(e);
        });
    });
};

/**
 * 上传用户头像
 *
 * @class      updateUserHeaderAction (name)
 * @param      {Object}    arg1         The argument 1
 * @param      {Function}  arg1.commit  The commit
 * @param      {<type>}    formData  The account data
 * @return     {Promise}   { description_of_the_return_value }
 */
export const updateUserHeaderAction = ({commit}, formData) => {
    return new Promise((resolve, reject) => {
        const model = loadFromLocal(null, 'logining', false);
        formData.append('user', model.user);
        formData.append('token', model.token);
        formData.append('name', model.name + Date.parse(new Date()));
        requestUploadImagePublic(formData).then((res) => {
            commit(types.SET_ISTEST, (model.authority !== '1005'));
            model.headPath = res.data.url;
            commit(types.SET_USER, model);
            saveToLocal(null, 'logining', model);
            resolve(res);
        }).catch(e => {
            console.log(e);
            resolve(e);
        });
    });
};
