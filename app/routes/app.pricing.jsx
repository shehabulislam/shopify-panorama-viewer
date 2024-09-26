import { json, useActionData, useNavigation, useSubmit } from '@remix-run/react';
import { Button } from '@shopify/polaris';
import useLoading from '../hooks/useLoading';
// import { json } from 'stream/consumers';
// import prisma from '../db.server';
// import { authenticate } from '../shopify.server';
import { useEffect } from 'react';
import { authenticate } from '../shopify.server';


// https://admin.shopify.com/store/sample-test-apps/charges/panorama-viewer/pricing_plans

export default function Pricing(){

    const submit  = useSubmit();
    const nav = useNavigation();
    const actionData = useActionData();
    const isLoading = useLoading(nav.state, nav.formMethod);


    const upgrade = async () => {
        console.log('upgrade')
        submit({name: 'Pro'}, {method: 'POST'})
    }


    useEffect(() => {
        console.log({actionData})
    }, [isLoading, actionData])

    return <>
        <Button loading={isLoading} onClick={upgrade}>Upgrade</Button>
        <iframe title="Pricing plan" src="https://admin.shopify.com/store/sample-test-apps/charges/panorama-viewer/pricing_plans"></iframe>
    </>
}

export const action = async ({ request }) => {
    // return json({data: 'working fine'})
    const { admin, session } = await authenticate.admin(request);
    const body = await request.formData();
    console.log('request received')
    try {
    //   const user = await prisma.Users.findMany({
    //     where: { shop: admin?.rest?.session?.shop },
    //   });
    //   const charge = await prisma.Charges.findMany({
    //     where: { shop: admin?.rest?.session?.shop },
    //   });
    
    //   if (user.length === 0) {
    //     return { error: "User not found" };
    //   }
    
      // Update user planId
    //   await prisma.Users.update({
    //     where: { id: user[0]?.id },
    //     data: { planId: body.get("id") },
    //   });
    
      let response;
    
      if (request.method === "POST") {
        console.log('sending')
        // Create new subscription
        response = await admin.graphql(
          `#graphql
          mutation AppSubscriptionCreate($name: String!, $lineItems: [AppSubscriptionLineItemInput!]!, $returnUrl: URL!, $trialDays: Int, $test: Boolean) {
            appSubscriptionCreate(name: $name, returnUrl: $returnUrl, lineItems: $lineItems, trialDays: $trialDays, test: $test) {
              userErrors {
                field
                message
              }
              appSubscription {
                id
              }
              confirmationUrl
            }
          }`,
          {
            variables: {
              name: body.get("name"),
              returnUrl: `https://admin.shopify.com/store/${session?.shop.split(".")[0]}/apps/html5-audio-player/app/SuccessBilling`,
              lineItems: [
                {
                  plan: {
                    appRecurringPricingDetails: {
                      price: {
                        amount: 10,
                        currencyCode: 'USD',
                      },
                      interval: "EVERY_30_DAYS",
                    },
                  },
                },
              ],
              trialDays: 7,
              test:true, // Set this to false in production
            },
          },
        );
      } 
  
      console.log('json',  `https://admin.shopify.com/store/${session?.shop.split(".")[0]}/apps/html5-audio-player/app/SuccessBilling`)
  
      console.log(response,"=================================================")
    //   console.log({response})
    
      const data = await response.json();
      return json({ data});
    } catch (error) {
      console.error("Error fetching:", error);
      throw json(error);
    }
    // Authentication
    
  
    
  };
  
  