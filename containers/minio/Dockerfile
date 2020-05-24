FROM minio/mc
ARG S3="http://192.168.86.82:9000"
RUN mc config host add minio $S3 test-access-key-id test-secret-access-key
RUN ["mc", "mb", "minio/serverless-cms.files.dev", "--region=localhost", "--ignore-existing"]
RUN ["mc", "mb", "minio/serverless-cms.transformed.dev", "--region=localhost", "--ignore-existing"]
RUN ["mc", "policy", "set", "public", "minio/serverless-cms.files.dev"]
RUN ["mc", "policy", "set", "public", "minio/serverless-cms.transformed.dev"]

