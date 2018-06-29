import * as types from './mutations-types';

const mutations = {
    [types.SET_USER](state, userModel) {
        state.userModel = userModel;
    }
};

export default mutations;
