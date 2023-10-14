export function isJson(data) {
    console.log("data", data);

    try {
        JSON.parse(data);
        return true;
    } catch (err) {
        return false;
    }
}