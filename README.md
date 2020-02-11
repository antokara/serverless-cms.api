# serverless cms - api

## local dev

### installation

`$npm run init`

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
