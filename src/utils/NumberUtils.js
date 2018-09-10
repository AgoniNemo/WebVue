/**
 * 验证字符串是不是金额
 */
export function regExpValidationMoney(value) {
    if (!/^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/.test(value)) {
        return false;
    }
    return true;
}

/**
 * 验证字符串是不是数字
 */
export function regExpValidation(value) {
    if (!/^[0-9]*$/.test(value)) {
        return false;
    }
    return true;
}
