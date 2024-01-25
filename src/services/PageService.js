import httpapi from '../httpapi'

function getAll(){
    return httpapi.get('pages/index');
}

function getById(id){
    return httpapi.get('pages/show/'+id);

}
function create(post){
    return httpapi.post('pages/store',post);
}
function update(id,post){
    return httpapi.post('pages/update/'+id,post);

}
function remove(id){
    return httpapi.delete('pages/destroy/'+id);

}
function getPostAll(limit,page=1)
{
    return httpapi.get(`pages/post_all/${limit}/${page}`);
}
function getPostBySlug(slug)
{
    return httpapi.get(`pages/post_detail/${slug}`);
}
function getPostByTopicId(limit,topic_id)
{
    return httpapi.get(`pages/post_topic/${limit}/${topic_id}`);
}
function getPostHome(limit)
{
    return httpapi.get(`post_list/${limit}`);
}
function getTrash(){
    return httpapi.get('pages/trash');
}

function deleteTrash(id){
    return httpapi.get('pages/trash/'+id);
}

function RescoverTrash(id){
    return httpapi.get('pages/restore/'+id);
}
function getPageAll(){
    return httpapi.get('pages/getpageAll');
}
const pageservice = {
    getPageAll:getPageAll,
    getTrash:getTrash,
    deleteTrash:deleteTrash,
    RescoverTrash:RescoverTrash,
    getPostHome:getPostHome,
    getPostByTopicId:getPostByTopicId,
    getPostBySlug:getPostBySlug,
    getPostAll:getPostAll,
    getAll: getAll,
    getById: getById,
    create: create,
    update: update,
    remove: remove
}
export default pageservice;