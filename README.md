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

## lint

`$npm run lint`

## build

`$npm run build`
