import httpapi from '../httpapi'

function getAll(){
    return httpapi.get('category/index');
}

function getById(id){
    return httpapi.get('category/show/'+id);

}
function create(category){
    return httpapi.post('category/store',category);
}
function update(id,category){
    return httpapi.post('category/update/'+id,category);

}
function remove(id){
    return httpapi.delete('category/destroy/'+id);

}
// function getCategoryByParentId(parent_id){
//     return httpapi.get(`category/category_list/${parent_id}`);
// }
function getCategoryByParentId(){
    return httpapi.get('category/category_list');
}
function showslug(slug)
{
    return httpapi.get('category/showslug/'+slug);
}
function getTrash(){
    return httpapi.get('category/trash');
}

function deleteTrash(id){
    return httpapi.get('category/trash/'+id);
}

function RescoverTrash(id){
    return httpapi.get('category/restore/'+id);
}
function getCategories(){
    return httpapi.get('category/getCategory');
}

const categoryservice = {
    getCategoryByParentId:getCategoryByParentId,
    showslug: showslug,
    getAll: getAll,
    getById: getById,
    create: create,
    update: update,
    remove: remove,
    getTrash:getTrash,
    deleteTrash:deleteTrash,
    RescoverTrash:RescoverTrash,
    getCategories:getCategories,
}
export default categoryservice;