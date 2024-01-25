import httpapi from '../httpapi'

function getAll(){
    return httpapi.get('brand/index');
}

function getById(id){
    return httpapi.get('brand/show/'+id);

}
function create(brand){
    return httpapi.post('brand/store',brand);
}
function update(id,brand){
    return httpapi.post('brand/update/'+id,brand);

}
function remove(id){
    return httpapi.delete('brand/destroy/'+id);

}
function getBySlug(slug)
{
    return httpapi.get("brand/show/"+slug);
}
function getBrandByParentId(parent_id){
    return httpapi.get(`brand_list/${parent_id}`);
}
function getTrash(){
    return httpapi.get('brand/trash');
}

function deleteTrash(id){
    return httpapi.get('brand/trash/'+id);
}

function RescoverTrash(id){
    return httpapi.get('brand/restore/'+id);
}
const brandservice = {
    getBrandByParentId:getBrandByParentId,
    getBySlug:getBySlug,
    getAll: getAll,
    getById: getById,
    create: create,
    update: update,
    remove: remove,
    getTrash:getTrash,
    deleteTrash:deleteTrash,
    RescoverTrash:RescoverTrash,
}
export default brandservice;