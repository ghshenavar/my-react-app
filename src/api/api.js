const first_half = "https://api.digikala.com/v1/search/?page="
const second_half = "&has_selling_stock=1&sort=4&q=سیب/"
const base_link = "https://api.digikala.com/v1/product/"

async function getItems(pageno, callBack) {

    try {
        fetch(first_half + pageno + second_half)
            .then((response) => response.json())
            .then((data) => callBack(data));
    } catch (error) {
        console.log("failed");
        return [];
    }

}

async function getPDP(id, callBack) {
    try {
        fetch(base_link + id + "/")
            .then((response) => response.json())
            .then((data) => callBack(data));
    }
    catch (error) {
        console.log("failed");
        return [];
    }
}

export { getItems, getPDP };
