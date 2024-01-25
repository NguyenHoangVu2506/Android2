import httpapi from '../httpapi'

function getAll(){
    return httpapi.get('contact/index');
}

function getById(id){
    return httpapi.get('contact/show/'+id);

}
function create(contact){
    return httpapi.post('contact/store',contact);
}
function update(id,contact){
    return httpapi.post('contact/update/'+id,contact);

}
function remove(id){
    return httpapi.delete('contact/destroy/'+id);

}
function getTrash(){
    return httpapi.get('contact/trash');
}

function deleteTrash(id){
    return httpapi.get('contact/trash/'+id);
}

function RescoverTrash(id){
    return httpapi.get('contact/restore/'+id);
}
const contactservice = {
    getTrash:getTrash,
    deleteTrash:deleteTrash,
    RescoverTrash:RescoverTrash,
    getAll: getAll,
    getById: getById,
    create: create,
    update: update,
    remove: remove
}
export default contactservice;