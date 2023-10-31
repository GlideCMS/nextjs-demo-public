## About application

All routing is configured in GPP but there are no blockers to developers adding new custom routes in the application. The Bootstrap application will allow pages and app routing. 

In the Bootstrap application we have one page which will collect all incoming requests and incoming URLS to pass to the core method which will resolve all data related to requested URLs.

The method for resolving route data is imported from the core-tools package from Glide. Here is an example of how to use this package:

  

  
  
  

    import { GlideTools } from "@glidecms/core-tools";
    
    import { MainModule } from "./custom-services/index.module";
    
      
    
    const glideTools = new GlideTools();
    
    //export function for tools init
    
    export const initGlideTools = async () => {
    
    await glideTools.setUpGlideTools(MainModule);
    
    };
    
    //export function to get inittialized tools
    
    export const getGlideTools = glideTools.getGlideTools;

We should initialize GlideTools at app bootstrap or in our case in getStaticProps method and wait for init to complete.

  
  
  

    export const getStaticPropsService = async (
    
    params
    
    ) => {

    //init glide tools - don't worry it won't initialize if already initialized and background refresh is running
    
      
    
    await initGlideTools();
    
    const tools= getGlideTools()
    
    // .....rest of the code
    
    }

  

GlideTools can accept one argument :

  

MainModule can specify custom services which can be injected IOC container with core services

  

Class:

  
  
  

    import { GdService } from "@glidecms/deliver-core-dev/services";
    
    export interface IExternalDataService {
    getMostPopularData();
    
    }
    
    @GdService({
    
    scope: 1,
    
    })
    
    export class ExternalDataService {}

Module:

  
  

      
    
    import { GdServerModule } from "@glidecms/deliver-core-dev";

    import { ExternalDataService } from "./external-data.service";
    @GdServerModule({
    
    bootstrapComponentName: "",
    
    declarations: [],
    
    imports: [],
    
    providers: [ExternalDataService],
    
    })
    
      
    
    export class MainModule {}

This way you can inject your custom services into IOC container.

  

  

GlideTools( getGlideTools in this example ) will return object with two keys:

  

 -  apiContainer - is IOC container will all core interfaces which you can use to fetch API data for every Glide resource, once IOC container is created it will be refreshed every 60 seconds in background

-  tools - set of methods which can resolve data for you out of box

  

ApiContainer is IOC container generated using Inversify and you can find all documentation on NPM

  

We can get certain service from container this way:

  
  
  

    import {
    
    SERVICE_TYPES,
    
    } from "@glidecms/deliver-core-dev/types/services";
    
    import { ExternalDataService } from "@/external-data.service";
    
    const glideTools = getGlideTools();
    
    const container = glideTools.apiContainer;
    
    const pagesService: IPageService = container.get(
    
    SERVICE_TYPES.IPageService
    
    );
    
    const externalService= container.get(
    
    ExternalDataService
    
    );

***Keep in mind that you can use Glide Tools instance only on server side***

  

Tools object at the moment has only one method for resolving URL data, method will accept url path as string and will return all glide configuration data related to that path if it matches one one configured routes in system.

  
  
  

    const { route: routeResolved } =
    
    await glideTools.tools.resolveRouteDataForUrl(urlPath);

  

Method will return all entities related to requested path which can be used to render requested page.
