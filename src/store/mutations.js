import * as types from './mutations-types';

const mutations = {
    [types.SET_USER](state, model) {
        state.userModel = model;
    },
    [types.SET_VIDEOMODEL](state, videoModel) {
        state.videoModel = videoModel;
    }
};

export default mutations;
