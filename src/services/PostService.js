import httpapi from '../httpapi'

function getAll(){
    return httpapi.get('post/index');
}

function getById(id){
    return httpapi.get('post/show/'+id);

}
function create(post){
    return httpapi.post('post/store',post);
}
function update(id,post){
    return httpapi.post('post/update/'+id,post);

}
function remove(id){
    return httpapi.delete('post/destroy/'+id);

}
function getPostAll(limit,page=1)
{
    return httpapi.get(`post/post_all/${limit}/${page}`);
}
function getPostBySlug(slug)
{
    return httpapi.get(`post/post_detail/${slug}`);
}
function getPostByTopicId(limit,page,topic_id)
{
    return httpapi.get(`post/post_topic/${limit}/${page}/${topic_id}`);
}
function getPostHome(limit)
{
    return httpapi.get(`post_list/${limit}`);
}
function getTrash(){
    return httpapi.get('post/trash');
}

function deleteTrash(id){
    return httpapi.get('post/trash/'+id);
}

function RescoverTrash(id){
    return httpapi.get('post/restore/'+id);
}
function getPageAll(){
    return httpapi.get('post/getpageAll');
}
const postservice = {
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
export default postservice;