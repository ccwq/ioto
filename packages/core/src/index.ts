export {
    safeBindToObject,
    safeJsonParser,
    treeEach,
    all2valueName,
    safeValueInList,
    getImageSize,
    isIE,
} from "./base"

export {
    BPromise,
    promiseMap,
} from "./promise";

export {
    stripString,
    randomString,
    firstLetterUppercase,
    fromGBKArrayToString,
    byteArrayToString,
    encodeStringToGBK,
    getByteLength,
    safeStringify,
} from "./string"

export {
    tryGet,
    travelTree,
    makeTreeDataHelper,
    isPlainObject
} from "./object"

export {
    AError
} from "./error"

export {
    Math2,
    preppendZero,
    strip as stripNumber,
    stripAndFix as stripAndFixNumber,
    safeValueInRange,
    safeParseNumber,
} from "./number"

// date
export {
    parse2date,
    all2date,
    getDayMountByMonth,
    getDayLengthInMonth,
    getWeekThInMonth,
    getWeekStartDateFromYYYYMMThInMonth,
} from "./date"

export {default as DateWeek} from "./date/DateWeek"
export {default as Date2} from "./date/Date2"
export {dayjs2} from "./date/dayjs-setup"
//end date

export {
    columnParseFactory as viewuiColumnFactory,
} from "./etc"

// export type {
//     All2ValueNameOption,
//     elFormatter,
// } from "./base/index";
