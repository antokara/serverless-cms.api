import express from 'express';
import { S3 } from 'aws-sdk';
import { GetObjectOutput } from 'aws-sdk/clients/s3';
import { s3ClientConfig } from './s3ClientConfig';

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
 */
app.get('/', async (req: express.Request, res: express.Response) => {
  return s3
    .getObject({
      Bucket: 'serverless-cms.files.dev',
      Key: String(req.query.id),
    })
    .promise()
    .then((image: GetObjectOutput) => {
      res.send('found');
    })
    .catch(() => {
      res.send('not found');
    });
});

app.listen(4000);
