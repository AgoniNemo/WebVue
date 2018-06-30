import qs from 'qs';
import request from '@/utils/request';

/**
 * 登录
 *
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
 * 请求最新的影片
 *
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
