import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import {  Page,  Layout,  BlockStack, Divider, Button, Box, Card } from "@shopify/polaris";
import { authenticate } from "../shopify.server";
// import PanoramaViewers from '../components/PanoramaViewers';
import prisma from '../db.server';
import { useMemo, useState } from 'react';
import Header from '../components/Header/Header';
import { TitleBar, Modal, useAppBridge } from '@shopify/app-bridge-react';
import PanoramaViewersV2 from '../components/PanoramaViewers/PanoramaViewersV2';


export default function Index() {

  const {viewers = [], subscription} = useLoaderData();
  const [currentPage, setCurrentPage] = useState('home')


  const plan = useMemo(() => { 
    console.log('in memo')
    if(subscription?.currentAppInstallation?.activeSubscriptions[0]){
      return subscription?.currentAppInstallation?.activeSubscriptions[0];
    }
    return {}; 
  }, [subscription?.currentAppInstallation?.activeSubscriptions])
  
  
  
  console.log({plan})

  return (
    <Page gap="500" fullWidth>
      <Header title="Home" />
      {/* <MyModal /> */}
      <BlockStack gap="500">
        <Layout>
          <PanoramaViewersV2 viewers={viewers} />
        </Layout>
      </BlockStack>
    </Page>
  );
}



export function MyModal() {
  const shopify = useAppBridge();
  window.shopify = shopify

  return (
    <>
      <Button onClick={() => shopify.modal.show('my-modal')}>Open Modal</Button>
      <Modal id="my-modal">
        <p>Message</p>
        <TitleBar title="Title">
          <button variant="primary">Label</button>
          <button onClick={() => shopify.modal.hide('my-modal')}>Label</button>
        </TitleBar>
      </Modal>
    </>
  );
}



export const loader = async ({ request }) => {
  const {session, admin} = await authenticate.admin(request);

  if(!session) {
    throw json({message: 'invalid session'})
  }

  const response = await admin.graphql(
    `#graphql
    query {
      currentAppInstallation {
        activeSubscriptions {
          name
          status
          createdAt
          test
          trialDays
          lineItems {
            plan {
              pricingDetails {
                ... on AppRecurringPricing {
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
    `,
  );

  const subscription = await response.json();


 

  const viewers = await prisma.panoramaViewer.findMany({
    where: {shop: session.shop}
  })

  return json({viewers, subscription: subscription?.data || false});
};



export const action = async ({ request }) => {
  const formData = await request.formData();
  const id = parseInt(formData.get('id') || null);

  try {
    if(request.method === 'DELETE'){
      const isDeleted = await prisma.panoramaViewer.delete({
        where: {id}
      });
  
      return json({
        message: 'Item has been deleted successfully',
        isDeleted
      })
    }
  } catch (error) {
    throw json(error);
  }

  


    return json({
      data: 'working fine',
      id: formData.get('id'),
    })
};
