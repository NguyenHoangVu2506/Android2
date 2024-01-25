import httpapi from "../httpapi";

function getProductAndStoreProduct() {
    return httpapi.get('store_products_admin/getProductAndStoreProduct');
}
function add_store_product(data_product) {
    return httpapi.post('store_products_admin/add_store_product',data_product);
}
function remove_store_product(data_product) {
    return httpapi.post('store_products_admin/remove_store_product',data_product);
}


const store_products_service = {
    getProductAndStoreProduct: getProductAndStoreProduct,
    add_store_product:add_store_product,
    remove_store_product:remove_store_product,

}
export default store_products_service;