import { S3 } from 'aws-sdk';

const s3ClientConfig: S3.ClientConfiguration = {
  apiVersion: '2006-03-01',
  endpoint: 'http://192.168.86.82:9000',
};

export { s3ClientConfig };
