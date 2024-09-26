// import { json } from '@remix-run/node';
import { Link, useActionData, useNavigation, useSubmit } from '@remix-run/react';
import {Page, DataTable, Button, InlineStack, Grid, LegacyCard, Card, MediaCard, Box} from '@shopify/polaris';
import React, { useEffect, useState } from 'react';
import useLoading from '../../hooks/useLoading';

import './styles.css'

import styles from './styles.module.css'

export default function PanoramaViewersV2({viewers}) {

  const  [deletingItem, setDeletingItem] = useState(null)

  const nav = useNavigation();
  const submit = useSubmit();
  const isLoading = useLoading(nav.state, nav.formMethod);
  const actionData = useActionData()

  const deleteItem = async (item) => {
    setDeletingItem(item.id);
    submit({id: item.id}, {method: 'DELETE'})
  }

  useEffect(() => {
    console.log(actionData)
    if(!isLoading){
      setDeletingItem(null)
    }
  }, [isLoading, actionData])

  const rows = viewers.map((item, index) => {
    return [
        index + 1,
        item.title,
        'html',
        item.id,
        <InlineStack key={item.id} gap="200">
            <Button disabled={isLoading} onClick={() => console.log('edit')}>Edit</Button> 
            <Button loading={deletingItem === item.id} disabled={isLoading} variant='primary' tone="critical" onClick={() => deleteItem(item)} >Delete</Button>
        </InlineStack>
    ]
  })

  return (
        <>
        <Grid>
          {viewers.map(item => {

            return <>
              <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 4, xl: 3}}>
                    <div className={`${styles.pan_single_item} pan_single_item`}> 
                      <img  src={item.img_src  || 'https://cdn.pixabay.com/photo/2023/06/04/12/00/rose-8039502_1280.jpg'} alt='' />
                      <div className={`${styles.pan_actions} pan_actions`} >
                        <Link to={`/app/edit/${item.id}`}><Button disabled={isLoading} onClick={() => console.log('edit')}>Edit</Button></Link> 
                        <Button loading={deletingItem === item.id} disabled={isLoading} variant='primary' tone="critical" onClick={() => deleteItem(item)} >Delete</Button>
                      </div>
                    </div>
              </Grid.Cell>
            </>
          })}
      </Grid>
        </>
  );
}
