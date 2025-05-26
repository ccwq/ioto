/**
 * await-to-js 带有类型
 */
export const to = <T, U = undefined>(promise: Promise<T>, errorExt?: object) => {
    return promise
        .then(function (data) {
            return [null, data] as [null, T];
        })
        .catch(function (err) {
            if (errorExt) {
                Object.assign(err, errorExt);
            }
            return [err, undefined] as [U, undefined];
        });
};
