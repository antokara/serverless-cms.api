import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { S3 } from 'aws-sdk';
import { GetObjectOutput } from 'aws-sdk/clients/s3';
import { s3ClientConfig } from 'resources/shared/s3ClientConfig';
import Sharp, { OutputInfo } from 'sharp';

const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const s3: S3 = new S3(s3ClientConfig);
  if (process.env.AWS_S3_BUCKET) {
    try {
      const originalImage: GetObjectOutput = await s3
        .getObject({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: event.queryStringParameters?.id ?? '',
        })
        .promise();
      if (typeof originalImage.Body !== 'undefined') {
        const { data, info }: { data: Buffer; info: OutputInfo } = await Sharp(
          originalImage.Body as Buffer,
        )
          .resize(150, 150)
          .flip()
          .toFormat('jpeg')
          .toBuffer({ resolveWithObject: true });

        const putObjectResult: S3.PutObjectOutput = await s3
          .putObject({
            Body: data,
            Bucket: process.env.AWS_S3_BUCKET ?? '',
            ContentType: `image/${info.format}`,
            Key: 'IMG_20200503_161804-resize.jpg',
          })
          .promise();

        return Promise.resolve({
          statusCode: 200,
          body: 'success',
        });
      }
    } catch (e) {
      // could not getObject, transform or putObject
      return Promise.resolve({
        statusCode: 500,
        body: 'failure',
      });
    }
  }

  // no s3 bucket was defined
  return Promise.resolve({
    statusCode: 500,
    body: 'failure',
  });
};

export { handler };
