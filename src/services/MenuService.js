import httpapi from '../httpapi'

function getAll(){
    return httpapi.get('menu/index');
}

function getById(id){
    return httpapi.get('menu/show/'+id);

}
function create(menu){
    return httpapi.post('menu/store',menu);
}
function update(id,menu){
    return httpapi.post('menu/update/'+id,menu);

}
function remove(id){
    return httpapi.delete('menu/destroy/'+id);

}
function getByParentId(position,parent_id)
{
    return httpapi.get(`menu/menu_list/${position}/${parent_id}`);
}
const menuservice = {
    getByParentId:getByParentId,
    getAll: getAll,
    getById: getById,
    create: create,
    update: update,
    remove: remove
}
export default menuservice;