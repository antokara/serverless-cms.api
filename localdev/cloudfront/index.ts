import express from 'express';
import { S3 } from 'aws-sdk';
import {
  CloudFrontResponseEvent,
  Context,
  Callback,
  CloudFrontResultResponse,
} from 'aws-lambda';
import { GetObjectOutput } from 'aws-sdk/clients/s3';
import { s3ClientConfig } from './s3ClientConfig';
// TODO: add path aliases for this project
// TODO: add linter
// TODO: add webpack
// TODO: add babel-ts
// TODO: add ts fork checker
import { handler as publicImagesHandler } from '../../resources/publicImages/app';

// initialize express app
const app: express.Application = express();

// initialize s3 client
const s3: S3 = new S3(s3ClientConfig);

/**
 * a VERY basic "implementation" of the cloudfront features/setup we will be using in production.
 * this is meant only to help us develop locally and test the publicImage lambda function
 * along with the rest of our app.
 *
 * emulation of functionality:
 *  it checks if the cache has the requested image and if not,
 *  it passes the request to the lambda@edge. Since this does not really have a cache,
 *  it will check the S3 bucket with the transformed images in its place.
 *
 * format of transformed image file names:
 *    hash__w500_h250_fp50x10_fbw_flipxy.jpeg
 *    hash  a random string or user generator (must not include __ two consecutive underscores)
 *        __  hash / parameters separator (__ two consecutive underscores)
 *          w500  width 500px
 *              _  parameter separator
 *               h250  height 250px
 *                    fp50x10  focal point 50%x10%
 *                            fbw  filter: black/white
 *                                flip x/y
 */
app.get('/*', async (req: express.Request, res: express.Response) => {
  s3.getObject({
    Bucket: 'serverless-cms.files.dev',
    Key: String(req.path),
  })
    .promise()
    .then((image: GetObjectOutput) => {
      // pass the request normally to the relative S3 bucket
      res.statusCode = 200;
      res.setHeader('Content-Type', image.ContentType);
      res.send(image.Body);
    })
    .catch(() => {
      // not found, invoke the publicImages lambda@edge to transform the image and then continue
      // the request to the transformed S3 bucket;
      const event: CloudFrontResponseEvent = {
        Records: [
          {
            cf: {
              config: {
                distributionDomainName: '',
                distributionId: '',
                eventType: 'origin-request',
                requestId: '',
              },
              request: {
                method: 'GET',
                clientIp: '',
                uri: '',
                querystring: '',
                headers: {},
              },
              response: {
                status: '200',
                statusDescription: 'ok',
                headers: {},
              },
            },
          },
        ],
      };
      const context: Context = {
        callbackWaitsForEmptyEventLoop: false,
        functionName: '',
        functionVersion: '',
        invokedFunctionArn: '',
        memoryLimitInMB: '',
        awsRequestId: '',
        logGroupName: '',
        logStreamName: '',
        getRemainingTimeInMillis: () => 0,
        done: () => {},
        fail: () => {},
        succeed: () => {},
      };
      const callback: Callback = () => {};
      const result: Promise<
        CloudFrontResultResponse
      > | void = publicImagesHandler(event, context, callback);
      if (result) {
        result
          .then((result: CloudFrontResultResponse): void => {
            res.statusCode = 200;
            res.send(result.body);
          })
          .catch(() => {
            res.statusCode = 500;
            res.send('Failed to transform');
          });
      } else {
        res.statusCode = 500;
        res.send('No transform response was returned');
      }
    });
});

app.listen(4000);
