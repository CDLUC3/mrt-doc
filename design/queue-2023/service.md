# Underlying Queue Service

- [Design](README.md)

## Why Zookeeper?

Explain our rationale.

## Alternatives

- Amazon SQS - no priority, messages have a shorter duration than we need
- Amazon MQ (deploys to managed EC2 instances)
  - Apache MQ (uses Zookeeper!)
  - Rabbit MQ 
- Apache Kafka (more like Amazon SNS) 
