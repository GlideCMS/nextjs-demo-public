
## Intro

Welcome to Glide Publishing Platform.
We are experts in helping users manage their content better and more effectively, to boost the things that matter like engagement, revenues, and content output .

We’re keen to help users build their own applications so have created a Bootstrap application powered by Next.js
Bootstrap app helps you to build responsive and mobile-friendly websites and applications, and achieve many tasks out of the box including complete dynamic routing, API tool kits, client-side rendering and much more. It also eases customisations and extending current functionalities.
Please check our documentation or reach out via our support portal if you need more information.

  

## Application Setup

In order to use our Bootstrap application you will need to obtain your environment API details from your GPP representative. Your introductory screen when deploying via Vercel will display welcome message with some useful links and other information which can be useful for start.

![GPP Landing page](https://media.sandbox-gc1.gcpp.io/sandbox/images/original/187c97ecec6e-screenshot-2024-07-04-at-141641.png "GPP Landing page")

  
  

Next step would be to edit environment variables in Vercel settings where you need to add two mandatory and one optional variable:

  

Mandatory:

  

- `CONNECT_API_URL`

  

- `CONNECT_API_KEY`

  

- `MEDIA_BASE_PATH` - GPP media base path

  
Optional:

- `PREGENERATE_PATHS` - array of slugs which will be pre generated e.g. `PREGENERATE_PATHS=["","sport","news"]`



![Vercel environment config](https://media.gpp.io/prod/images/widget_background_image/09482b655848-screenshot-2023-09-21-at-150706-1.png "Vercel environment config")
  

After you successfully deploy the application, you should able to see a message confirming that your application is configured correctly, and you can then proceed with Glide configuration. This message will remain until you create and publish your first page in Glide.

![GPP Starter](https://media.sandbox-gc1.gcpp.io/sandbox/images/original/273bc03fa552-screenshot-2024-07-04-at-141557.png "GPP Starter")
  
  

  

Note that with app deployment you will get some generic components which you can use directly in your CMS app configuration or you can use/extend them in your custom functionalities and components.
To find out more about this application please check out our documentation [here](https://github.com/GlideCMS/nextjs-demo-public/blob/main/about.md  "here").
  



