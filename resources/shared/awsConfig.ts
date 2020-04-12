import { Config } from 'aws-sdk';

const awsConfig: Config = new Config();

awsConfig.update({
  credentials: {
    accessKeyId: 'test-access-key-id',
    secretAccessKey: 'test-secret-access-key',
  },
  region: 'localhost',
  sslEnabled: false,
});

export { awsConfig };
