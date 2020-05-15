import { S3 } from 'aws-sdk';

const s3ClientConfig: S3.ClientConfiguration = {
  apiVersion: process.env.AWS_S3_VERSION,
  endpoint: process.env.AWS_S3_ENDPOINT,
};

export { s3ClientConfig };
