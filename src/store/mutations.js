import * as types from './mutations-types';

const mutations = {
    [types.SET_USER](state, model) {
        state.userModel = model;
    }
};

export default mutations;
