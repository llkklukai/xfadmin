import toUpload from '../config/toUpload'

/**
 * 上传
 * @param
 * @returns {*|void}
 */
export const uploadFile = data => toUpload('/product/upload',data);


