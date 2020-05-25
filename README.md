# serverless cms - api

## local dev

### installation

`$npm run init`

### configuration

edit `env.json`  
note that `AWS_DYNAMODB_ENDPOINT` must point to the explicit IP address
of your computer on the network. You cannot use _localhost_ or _127.0.0.1_ because
the Lambda function runs in a container and _localhost_, will be the container itself...

### run

#### DynamoDB and S3

`$sudo docker-compose -f containers/compose.develop.yml up`
`$npm run config:s3 -- --build-arg S3=http://192.168.86.82:9000` (required only once, replace the IP of the S3 with your network IP)

#### DynamoDB access

1. download [DynamoDb-GUI-Client](https://github.com/Arattian/DynamoDb-GUI-Client)
1. install / run
1. connect to [http://localhost:8000](http://localhost:8000)

#### S3 access

open [http://127.0.0.1:9000/minio/](http://127.0.0.1:9000/minio/) in your browser
login with `test-access-key-id` and `test-secret-access-key`

or

using the [cli guide](https://docs.minio.io/docs/aws-cli-with-minio.html)

#### one command API

`$npm run dev`

#### separate commands (more control)

useful if you need to restart the API regularly (ie. while working on template.yaml)

`$npm run dev:watch`  
`$npm run dev:start-api`
`$npm run dev:cloudfront`

## lint

`$npm run lint`

## build

`$npm run build`

## Infrastructure

### Image Processing

[Resizing Images with Amazon CloudFront & Lambda@Edge | AWS CDN Blog](https://aws.amazon.com/blogs/networking-and-content-delivery/resizing-images-with-amazon-cloudfront-lambdaedge-aws-cdn-blog/)

[Resize Images on the Fly with Amazon S3, AWS Lambda, and Amazon API Gateway](https://aws.amazon.com/blogs/compute/resize-images-on-the-fly-with-amazon-s3-aws-lambda-and-amazon-api-gateway/)

[Lambda@Edge Example Functions](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-examples.html)

For local development, in lieu of AWS S3, we use [minio](https://min.io/) and for the
