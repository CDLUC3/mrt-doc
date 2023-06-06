# Underlying Queue Service

- [Design](README.md)

## Why [Zookeeper](https://zookeeper.apache.org/)?

Explain our rationale.

## Queueing Alternatives

- [Amazon SQS](https://aws.amazon.com/pm/sqs/) - no priority, messages have a shorter duration than we need
- [Amazon MQ](https://aws.amazon.com/amazon-mq/) (deploys to managed EC2 instances)
  - [Apache MQ](https://activemq.apache.org/) (uses Zookeeper!)
  - [Rabbit MQ](https://www.rabbitmq.com/) 
- [Apache Kafka](https://kafka.apache.org/intro) (more like Amazon SNS) 

## Distributed Locking
- [Redis](https://redis.io/)
- [DynamoDB](https://aws.amazon.com/dynamodb)

## State Transition (for Queue Items)
- [Amazon Eventbridge](https://aws.amazon.com/eventbridge/)
- [Amazon Step Functions](https://docs.aws.amazon.com/step-functions/index.html)

## AWS Consultation with Kevin and Maria
- Consider EMR for running ZK, may be a costly option: https://docs.aws.amazon.com/emr/latest/ReleaseGuide/emr-zookeeper.html
- Consider AWS Step Functions instead of queueing with ZK
  - Kevin will brainstorm and estimate if this could be more affordable than our 5 t3.small instances
- Consider fargate + event stream to configure hosts: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cloudwatch_event_stream.html
  - Kevin will send Ashley code samples 
