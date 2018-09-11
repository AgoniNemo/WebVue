import qs from 'qs';
import request from '@/utils/request';

/**
 * 登录
 * user：用户名
 * password：用户密码
 * @param      {<type>}  data    The data
 * @return     {<type>}  { description_of_the_return_value }
 */
export const requestLogin = data => {
    return request({
            url: `/user/login`,
            method: 'post',
            data: qs.stringify({
                ...data
            })
        })
        .then(res => res.data);
};

/**
 * 用户头像上传
 * user：用户名
 * token：用户注册与登录时有返回
 * name：图片名字
 * file：图片体
 * @param      {<type>}  data    The data
 * @return     {<type>}  { description_of_the_return_value }
 */
export const requestUpdateUserImage = data => {
    return request({
            url: `/file/updateImage`,
            method: 'post',
            data: qs.stringify({
                ...data
            })
        })
        .then(res => res.data);
};

/**
 * 用户信息修改
 * user：用户名
 * token：用户注册与登录时有返回
 * name：图片名字
 * file：图片体
 * @param      {<type>}  data    The data
 * @return     {<type>}  { description_of_the_return_value }
 */
export const requestModifyUserInfo = data => {
    return request({
            url: `/user/modifyInfo`,
            method: 'post',
            data: qs.stringify({
                ...data
            })
        })
        .then(res => res.data);
};

/**
 * 请求最新的影片
 * user：用户名
 * token：用户注册与登录时有返回
 * count：条数
 * page：页数（从0开始）
 * @param      {<type>}  data    The data
 * @return     {<type>}  { description_of_the_return_value }
 */
export const requestLatestVideo = data => {
    return request({
            url: `/video/latestVideo`,
            method: 'post',
            data: qs.stringify({
                ...data
            })
        })
        .then(res => res.data);
};

/**
 * 影片评论
 * user：用户名
 * token：用户注册与登录时有返回
 * id：影片标识
 * content：评论内容
 * @param      {<type>}  data    The data
 * @return     {<type>}  { description_of_the_return_value }
 */
export const requestCommentVideo = data => {
    return request({
            url: `/comment/commit`,
            method: 'post',
            data: qs.stringify({
                ...data
            })
        })
        .then(res => res.data);
};

/**
 * 请求影片评论列表
 * user：用户名
 * token：用户注册与登录时有返回
 * id：影片标识
 * @param      {<type>}  data    The data
 * @return     {<type>}  { description_of_the_return_value }
 */
export const requestCommentListVideo = data => {
    return request({
            url: `/comment/list`,
            method: 'post',
            data: qs.stringify({
                ...data
            })
        })
        .then(res => res.data);
};

/**
 * 用户收藏影片
 * user：用户名
 * token：用户注册与登录时有返回
 * id：影片标识
 * collection：是否收藏(传入字符0为取消收藏，字符1为收藏)
 * @param      {<type>}  data    The data
 * @return     {<type>}  { description_of_the_return_value }
 */
export const requestColStateVideo = data => {
    return request({
            url: `/video/colState`,
            method: 'post',
            data: qs.stringify({
                ...data
            })
        })
        .then(res => res.data);
};

/**
 * 请求用户收藏列表
 * user：用户名
 * token：用户注册与登录时有返回
 * @param      {<type>}  data    The data
 * @return     {<type>}  { description_of_the_return_value }
 */
export const requestCollectionListVideo = data => {
    return request({
            url: `/video/collectionList`,
            method: 'post',
            data: qs.stringify({
                ...data
            })
        })
        .then(res => res.data);
};

/**
 * 影片搜索
 * user：用户名
 * token：用户注册与登录时有返回
 * key：搜索字符
 * @param      {<type>}  data    The data
 * @return     {<type>}  { description_of_the_return_value }
 */
export const requestSearchVideo = data => {
    return request({
            url: `/video/searchVideo`,
            method: 'post',
            data: qs.stringify({
                ...data
            })
        })
        .then(res => res.data);
};

/**
 * 图片上传
 * @param data
 * @returns {PromiseLike<T> | Promise<T> | *}
 */
export const requestUploadImagePublic = data => {
    return request({
      url: `/file/updateImage`,
      method: 'post',
      data: data
    }).then(res => res.data);
};
