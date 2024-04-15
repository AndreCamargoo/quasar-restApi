import useApi from '../composables/UseApi'

export default function postServices(){
    const { list, getById, post, update, remove } = useApi('posts')

    return {
        list,
        getById,
        post,
        update,
        remove
    }
}