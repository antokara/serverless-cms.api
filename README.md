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

#### DynamoDB

`$sudo docker-compose -f containers/compose.develop.yml up`

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
