import {  json,  useActionData,  useNavigate,  useNavigation, useSubmit } from '@remix-run/react';

import {  Page } from '@shopify/polaris';
import { useEffect, useState } from 'react';
import prisma from '../db.server';
import { authenticate } from '../shopify.server';
import Header from '../components/Header/Header';
import useLoading from '../hooks/useLoading';
import PanoramaForm from '../components/PanoramaForm/PanoramaForm';

export default function Edit(){

    const [data, setData] = useState({type: 'image', }) 

    const nav = useNavigation()
    const navigate = useNavigate();
    const actionData = useActionData()
    const submit = useSubmit();
    const isLoading = useLoading(nav.state, nav.formMethod);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            submit(data, {method: 'PUT'})
        } catch (error) {
            console.log('working fine', error)
        }
      };


    const handleChange = (key, value) => {
        setData(data => ({...data, [key]: value}))
    }

    useEffect(() => {
       if(!isLoading && actionData?.success){
            navigate('/app')
       }
    }, [isLoading, actionData, navigate])


    return <>
   
    <Page>
        <Header title="Create New" />
        <PanoramaForm handleChange={handleChange} handleSubmit={handleSubmit} isLoading={isLoading} data={data} />
    </Page>
    </>
}

export async function action({request, params}){
    // throw json({error: 'failed'})
    // return json({data: 'ignoring'})

    const response = await new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 5000);
    })
    return json({message: 'working fine from promise', success: true})

    const {session} = await authenticate.admin(request);
    const formData = await request.formData();
    const data = Object.fromEntries(formData)

    Object.keys(data).forEach(key => {
        if(data[key] === 'true'){
            data[key] = true;
        }
        if(data[key] === 'false'){
            data[key] = false;
        }
    })

    try {
        const result = await prisma.panoramaViewer.create({data: {...data, shop: session.shop}})
        return json({data: result, success: true}) 
    } catch (error) {
        throw json(error)
    }
}