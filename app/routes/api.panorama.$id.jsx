import { json } from '@remix-run/node';

export function loader(){
    return json({
        data: 'nothing to hide'
    })
}


export function action({request, params}){
    const {id} = params;

    if(isNaN(id)){
        throw json({message: 'invalid id'})
    }

    if(request.method === 'DELETE'){
        return deleteItem(id);
    }

    

    return json({
        data: 'working fine from action',
        params,
        method: request.method || 'GET'
    })
}


const deleteItem = (id) => {
    return json({message: 'deleted successfully'+id})
}