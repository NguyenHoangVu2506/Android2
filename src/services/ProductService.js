import httpapi from '../httpapi'



function getProductHome(limit,category_id)
{
    return httpapi.get(`product_home/${limit}/${category_id}`);
}
function getProductBySlug(slug)
{
    return httpapi.get(`product_detail/${slug}`);
}
function getProductById(id)
{
    return httpapi.get(`product_detail/${id}`);
}

function getProductByCategoryId(limit,category_id)
{
    return httpapi.get(`product/product_category/${category_id}/${limit}`);
}
function getProductByBrandId(limit,brand_id)
{
    return httpapi.get(`product/product_brand/${limit}/${brand_id}`);
}
function getBySlug(slug)
{
    return httpapi.get("category/show/"+slug);
}
function getAll(limit,page){
    return httpapi.get('product/index/'+ limit + '/' + page);
}

function getById(id){
    return httpapi.get('product/show/'+id);

}
function create(product){
    return httpapi.post('product/store',product);
}
function update(id,product){
    return httpapi.post('product/update/'+id,product);

}
function remove(id){
    return httpapi.delete('product/destroy/'+id);

}
function getSearchProduct(key,limit,page){
    return httpapi.get(`product/search_product/${key}/${limit}/${page}`);
}
function getTrash(){
    return httpapi.get('product/trash');
}

function deleteTrash(id){
    return httpapi.get('product/trash/'+id);
}

function RescoverTrash(id){
    return httpapi.get('product/restore/'+id);
} 
const productservice = {
    getSearchProduct:getSearchProduct,
    getProductById:getProductById,
    getProductHome:getProductHome,
    getProductBySlug:getProductBySlug,
    getProductByCategoryId:getProductByCategoryId,
    getProductByBrandId:getProductByBrandId,
    getBySlug:getBySlug,
    getAll: getAll,
    getById: getById,
    create: create,
    update: update,
    remove: remove,
    RescoverTrash:RescoverTrash,
    deleteTrash:deleteTrash,
    getTrash:getTrash,
}
export default productservice;