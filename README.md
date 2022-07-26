# Feedbacks Microservice

This is a user feedbacks microservice from Pip.Services library. 
It allows users to communicate to application support, request help, share ideas or raise copyright issues.
When feedbacks are processed by support personnel, user receives a feedback via provided email.

The microservice currently supports the following deployment options:
* Deployment platforms: Standalone Process, Seneca
* External APIs: HTTP/REST, Seneca, AWS Lambda
* Persistence: In-Memory, Flat Files, MongoDB

This microservice has dependencies on the following microservices:
- [service-attachments](https://github.com/pip-services-content2/service-attachments-node) - to reference pictures and documents associates with feedbacks

<a name="links"></a> Quick Links:

* [Download Links](doc/Downloads.md)
* [Development Guide](doc/Development.md)
* [Configuration Guide](doc/Configuration.md)
* [Deployment Guide](doc/Deployment.md)
* Client SDKs
  - [Node.js SDK](https://github.com/pip-services-support2/client-feedbacks-node)
* Communication Protocols
  - [HTTP Version 1](doc/HttpProtocolV1.md)
  - [Seneca Version 1](doc/SenecaProtocolV1.md)

##  Contract

Logical contract of the microservice is presented below. For physical implementation (HTTP/REST, Thrift, Seneca, Lambda, etc.),
please, refer to documentation of the specific protocol.

```typescript
class FeedbackV1 implements IStringIdentifiable {
    /* Identification */
    public id: string;
    public category: string;
    public app?: string;

    /* Generic request properties */
    public sender: PartyReferenceV1;
    public sent_time: Date;

    /* Common properties */
    public title?: string;
    public content?: string;
    public pics: AttachmentV1[];
    public docs: AttachmentV1[];

    /* Copyright/Trademark Violation */
    public company_name?: string;
    public company_addr?: string;
    public copyright_holder?: string;
    public original_loc?: string;
    public copyrighted_work?: string;
    public unauth_loc?: string;

    /* Generic reply properties */
    public reply_time?: Date;
    public replier?: PartyReferenceV1;
    public reply?: string;

    /* Custom fields */
    public custom_hdr?: any;
    public custom_dat?: any;
}

class AttachmentV1 {
    public id?: string;
    public uri?: string;
    public name?: string;
}

class PartyReferenceV1 {
    public id: string;
    public name?: string;
    public email?: string;
}

interface IFeedbacksController {
    getFeedbacks(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<FeedbackV1>>;

    getFeedbackById(correlationId: string, feedbackId: string): Promise<FeedbackV1>;

    sendFeedback(correlationId: string, feedback: FeedbackV1, user: PartyReferenceV1): Promise<FeedbackV1>;

    replyFeedback(correlationId: string, feedbackId: string, reply: string, user: PartyReferenceV1): Promise<FeedbackV1>;

    deleteFeedbackById(correlationId: string, feedbackId: string): Promise<FeedbackV1>;
}
```

## Download

Right now the only way to get the microservice is to check it out directly from github repository
```bash
git clone git@github.com:pip-services-support2/service-feedbacks-node.git
```

Pip.Service team is working to implement packaging and make stable releases available for your 
as zip downloadable archieves.

## Run

Add **config.yml** file to the root of the microservice folder and set configuration parameters.
As the starting point you can use example configuration from **config.example.yml** file. 

Example of microservice configuration
```yaml
---
- descriptor: "pip-services-commons:logger:console:default:1.0"
  level: "trace"

- descriptor: "service-feedbacks:persistence:file:default:1.0"
  path: "./data/feedbacks.json"

- descriptor: "pip-services-attachments:client:http:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 8082

- descriptor: "service-feedbacks:controller:default:default:1.0"

- descriptor: "service-feedbacks:service:http:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 8080
```
 
For more information on the microservice configuration see [Configuration Guide](Configuration.md).

Start the microservice using the command:
```bash
node run
```

## Use

The easiest way to work with the microservice is to use client SDK. 
The complete list of available client SDKs for different languages is listed in the [Quick Links](#links)

If you use Node.js then you should add dependency to the client SDK into **package.json** file of your project
```javascript
{
    ...
    "dependencies": {
        ....
        "client-feedbacks-node": "^1.0.*",
        ...
    }
}
```

Inside your code get the reference to the client SDK
```javascript
let sdk = new require('client-feedbacks-node');
```

Define client configuration parameters that match configuration of the microservice external API
```javascript
// Client configuration
let config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};
```

Instantiate the client and open connection to the microservice
```javascript
// Create the client instance
let client = sdk.FeedbacksHttpClientV1(config);

// Connect to the microservice
await client.open(null);

// Work with the microservice
...
```

Now the client is ready to perform operations
```javascript
// Send feedback to support
let feedback = await client.sendFeedback(
    null,
    {
        category: 'support',
        title: 'Please help',
        content: 'When I am trying to run application in Win 10 it crashes'
    },
    {
        id: '123',
        name: 'Test User',
        email: 'somebody@somewhere.com'
    }
);
```

```javascript
// Reply feedback
feedback = await client.replyFeedback(
    null,
    feedback.id,
    'Please, be patient. We are working to fix that issue.',
    {
        id: '321',
        name: 'Support Team',
        email: 'support@somewhere.com'
    }
);
```    

## Acknowledgements

This microservice was created and currently maintained by *Sergey Seroukhov*.

