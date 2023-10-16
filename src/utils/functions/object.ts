export function mergeObjects(object1: any, object2: any): object {
    const result: any = {};

    for (let prop in object1) {
        if (object1.hasOwnProperty(prop)) {
            result[prop] = object1[prop];
        }
    }
    for (let prop in object2) {
        if (
            object2.hasOwnProperty(prop) &&
            (object2[prop] || object2[prop] === false)
        ) {
            result[prop] = object2[prop];
        }
    }

    return result;
}
