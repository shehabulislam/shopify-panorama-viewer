import {  json,  useActionData,  useLoaderData,  useNavigate,  useNavigation, useSubmit } from '@remix-run/react';

import {  Card, Grid, LegacyCard, Page } from '@shopify/polaris';
import { useEffect, useState } from 'react';
import prisma from '../db.server';
// import { authenticate } from '../shopify.server';
import Header from '../components/Header/Header';
import useLoading from '../hooks/useLoading';
import PanoramaForm from '../components/PanoramaForm/PanoramaForm';
import { Viewer } from '../components/Viewer/Viewer';


// import pannelumJS from './../assets/js/pannellum.js';
// import pannelumStyles from './../assets/css/pannellum.css';

// import sdfsdf from './../assets/js/pannellum.js'


export default function Edit(){

    const [data, setData] = useState({type: 'image', }) 

    const nav = useNavigation()
    const navigate = useNavigate();
    const actionData = useActionData()
    const submit = useSubmit();
    const isLoading = useLoading(nav.state, nav.formMethod);

    const loaderData = useLoaderData();

    useEffect(() => {
        if(loaderData.viewer && !data.title){
            setData(loaderData.viewer)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loaderData])


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
        console.log({actionData})
       if(!isLoading && actionData?.success){
            shopify.toast.show('Item Updated Successfully!')
       }
    }, [isLoading, actionData, navigate])


    return <>
   
    <Page fullWidth>
        <Header title="Create New" />
        <Grid>
            <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 4, lg: 3, xl: 3}}>
                {/* <PanoramaForm handleChange={handleChange} handleSubmit={handleSubmit} isLoading={isLoading} data={data} /> */}
            </Grid.Cell>
            <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 8, lg: 9, xl: 9}}>
                <Card title="Orders" sectioned>
                    <Viewer />
                </Card>
            </Grid.Cell>
        </Grid>
        
    </Page>
    </>
}

export async function action({request, params}){
    // throw json({error: 'failed'})
    // return json({data: 'ignoring'})

    // const response = await new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve()
    //     }, 5000);
    // })
    // return json({message: 'working fine from promise', success: true})

    // const {session} = await authenticate.admin(request);
    

    try {
        const formData = await request.formData();
        const data = Object.fromEntries(formData)

        const id = parseInt(data.id);
        delete data.id;

        Object.keys(data).forEach(key => {
            if(data[key] === 'true'){
                data[key] = true;
            }
            if(data[key] === 'false'){
                data[key] = false;
            }
        })
        const result = await prisma.panoramaViewer.update({ 
            where: {id},
            data
        })
        return json({data: result, success: true}) 
    } catch (error) {
        throw json(error)
    }
}


export async function loader({params}){
    try {
        const id = parseInt(params.id);
    
        const viewer = await prisma.panoramaViewer.findFirst({
            where: {id}
        });

        if(id < 0){
            throw json({message: 'Invalid ID'})
        }

        return json({viewer})
    } catch (error) {
        throw json(error);
    }
}


export function links(){

    return [
        {
            rel: 'stylesheet',
            href: '/assets/css/pannellum.css',
        }
    ]
}

