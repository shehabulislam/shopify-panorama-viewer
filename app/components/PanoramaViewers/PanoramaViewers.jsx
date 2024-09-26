// import { json } from '@remix-run/node';
import { useActionData, useNavigation, useSubmit } from '@remix-run/react';
import { DataTable, Button, InlineStack} from '@shopify/polaris';
import React, { useEffect, useState } from 'react';
import useLoading from '../../hooks/useLoading';

function PanoramaViewers({viewers}) {

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
        <DataTable
        style={{minWidth: '600px'}}
        className="aaaaaaaaaaaaaaa"
          columnContentTypes={[
            'text',
            'text',
            'html',
            'numeric',
            'html',
          ]}
          headings={[
            'SL.',
            'Title',
            'Copy Embed Code',
            'ID',
            'Action',
          ]}
          rows={rows}
        //   totals={['', '', '', 255, '$155,830.00']}
        //   pagination={{
        //     hasNext: false,
        //     onNext: () => {},
        //   }}
        />
  );
}

export default PanoramaViewers;