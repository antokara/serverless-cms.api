import {
  CloudFrontResponseHandler,
  CloudFrontResponseEvent,
  CloudFrontResultResponse,
} from 'aws-lambda';
import { S3 } from 'aws-sdk';
import { GetObjectOutput } from 'aws-sdk/clients/s3';
// TODO: fix path alias because it gets invoked by localdev/cloudfront
import { s3ClientConfig } from '../../resources/shared/s3ClientConfig';
import Sharp, { OutputInfo } from 'sharp';

/**
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
 * @param event
 */
const handler: CloudFrontResponseHandler = async (
  event: CloudFrontResponseEvent,
): Promise<CloudFrontResultResponse> => {
  const s3: S3 = new S3(s3ClientConfig);
  if (process.env.AWS_S3_BUCKET) {
    try {
      const originalImage: GetObjectOutput = await s3
        .getObject({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: event.Records[0].cf.request?.uri ?? '',
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
          status: '200',
          body: 'success',
        });
      }
    } catch (e) {
      // could not getObject, transform or putObject
      return Promise.reject(new Error('cloud not find master image'));
    }
  }

  // no s3 bucket was defined
  return Promise.reject(new Error('no S3 was defined'));
};

export { handler };
