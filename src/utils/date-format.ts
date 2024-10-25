import dayjs, { Dayjs } from "dayjs";

function dateFormat(src: any): any {
    if (typeof src === 'object' && src !== null && !Array.isArray(src)) {
        const result: any = {};
        for (const key in src) {
            if (isDate(src[key])) {
                result[key] = src[key].format('YYYY-MM-DD HH:mm:ss');
            } else {
                result[key] = dateFormat(src[key]);
            }
        }
        return result;
    } else if (Array.isArray(src)) {
        return src.map(item => dateFormat(item));
    } else {
        return src;
    }
}

function isDate(text: string) {
    const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    return regex.test(text);
}

export { dateFormat };
