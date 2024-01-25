import httpapi from "../httpapi";

function getSaleProductAll(limit, page = 1) {
    return httpapi.get('product_sale/getSaleProductAll/' + limit + '/' + page);
}
function SaleProductAll_filter(limit, page = 1,data) {
    return httpapi.post('product_sale/SaleProductAll_filter/' + limit + '/' + page,data);
}
function create(productsale){
    return httpapi.post(`product_sale/store`, productsale);
}
const SaleProductsService = {
    create:create,
    getSaleProductAll:getSaleProductAll,
    SaleProductAll_filter:SaleProductAll_filter,


}
export default SaleProductsService;