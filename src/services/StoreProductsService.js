import httpapi from '../httpapi'

function getNewProductAll(limit, page = 1) {
    return httpapi.get('product_store/getNewProductAll/16/1');
}
function getBestsallerProductAll(limit, page = 1) {
    return httpapi.get('product_store/getBestsallerProductAll/' + limit + '/' + page);
}
function getProductByCategory(limit, page = 1,category_id) {
    return httpapi.get('product_store/getProductByCategory/' + limit + '/' + page + '/' + category_id);
}
function getProductByBrand(limit, page = 1,slug) {
    return httpapi.get('product_store/getProductByBrand/' + limit + '/' + page + '/' + slug);
}

function product_detail(slug, other_product_limit, comment_limit) {
    return httpapi.get('product_store/product_detail/' + slug + '/' + other_product_limit + '/' + comment_limit);
}
function ProductByCategory_filter(limit, page = 1,slug,filter=-1,brandid_price) {
    return httpapi.post('product_store/ProductByCategory_filter/' + limit + '/' + page+ '/' + slug + '/' + filter,brandid_price);
}
function ProductByBrand_filter(limit, page = 1,slug,filter=-1,brandid_price) {
    return httpapi.post('product_store/ProductByCategory_filter/' + limit + '/' + page+ '/' + slug + '/' + filter,brandid_price);
}

function ProductsByCategory(limit, page = 1,slug) {
    return httpapi.post('product_store/ProductsByCategory/' + limit + '/' + page+ '/' + slug );
}
function BestSallersProductAll_filter(limit,page,data){
    return httpapi.post('product_store/BestSallersProductAll_filter/'+limit+'/'+page,data);

}
function NewProductAll_filter(limit,page,data){
    return httpapi.post('product_store/NewProductAll_filter/'+limit+'/'+page,data);

}
const StoreProductsService = {
    getNewProductAll: getNewProductAll,
    getBestsallerProductAll:getBestsallerProductAll,
    getProductByCategory:getProductByCategory,
    product_detail: product_detail,
    ProductByCategory_filter: ProductByCategory_filter,
    BestSallersProductAll_filter:BestSallersProductAll_filter,
    NewProductAll_filter:NewProductAll_filter,
    ProductsByCategory:ProductsByCategory,
    ProductByBrand_filter:ProductByBrand_filter,
    getProductByBrand:getProductByBrand,

}
export default StoreProductsService;