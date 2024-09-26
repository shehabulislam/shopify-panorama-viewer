import { json } from '@remix-run/node';

export function loader(){
    return json({
        data: 'nothing to hide'
    })
}


export function action(){
    return json({
        data: 'working fine from action'
    })
}