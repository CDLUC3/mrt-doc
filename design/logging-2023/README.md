# Merritt Consolidated Logging

## Assumptions

Based on Ashley's prior experimentation with Open Search, here is our approach
- Java Services will use Log4j2 for logging.  Log files will be written as Json with an ECSLayout format.
  - [BOM Changes to enable logging](https://github.com/CDLUC3/mrt-core2/pull/31) 
- All java services will add a new library that will generate logs in json format.  These json records will be consumed by Open Search.
  - The older, unstructured log messages do not need to be eliminated immediately BUT these older log messages should not constrain us from modernizing our logging approach.
  - As our services migrate to serverless and container architectures, it will become increasingly difficult to tail log files.
  - The future way to view logs will be to query open search.
  - We will wean ourselves off of the narrative log files as we are able to rely more and more on the Open Search logs.
  - Sample PR's to enable logging
    - [Ingest](https://github.com/CDLUC3/mrt-ingest/pull/80)
    - [Storage](https://github.com/CDLUC3/mrt-store/pull/37) 
- Ruby services will be modified to generate json logs
  - For the UI, it is important to capture request and response details in a single message 
  - [UI Changes to Enable Logging](https://github.com/CDLUC3/mrt-dashboard/pull/146)

## What will we capture in OpenSearch?
- WAF Logs
- ALB Logs
  - If available, there may be little need for tomcat access logs
- Application logs from Merritt java services (json format)
- Application logs from Merritt UI (json format)
- Cloudwatch logs for Lambda functions

## Documenation
- [Log4j2 Manual](https://logging.apache.org/log4j/2.x/manual/index.html)

### Other Documentation used in preparing this recommendation
Ashley's notes
- https://github.com/CDLUC3/mrt-doc-private/blob/main/docs/poc/log4j-ecs-layout_setup.md
- https://github.com/CDLUC3/mrt-doc-private/blob/main/docs/poc/logback-ecs-encoder_setup.md
- https://github.com/CDLUC3/mrt-store/compare/main...log4j-ecs-layout

Formatting Tomcat access logs 
- https://tomcat.apache.org/tomcat-8.5-doc/config/valve.html#JSON_Access_Log_Valve
Formatting catalina.out
- Jersey messages - change logging class: https://stackoverflow.com/a/38024230/3846548 

## Migration Plans
- Application logs
  - Modify code to use log4j2 instead of current methods
  - Add key events to log4j

## Log Level Guidance
- Fatal 
  - unrecoverable error has occurred (do not use this if a retry will happen)
    - Eventually, this should trigger a Nagios alert 
- Error 
  - error requiring eventual intervention by Merritt Team
    - Avoid the use of this for situations that will be routinely ignored
- Warning 
  - indicates a possible problem, team will generally not take action but a warning might help in diagnosing a problem.
- Info
  - General message conveying useful state information
  - Key events will be logged as info messages
- Debug
  - Detailed processing detail  
  - Under normal situations, these should be suppressed from logs
  - These will not be saved to open search  
- Trace
  - Extra Detailed processing detail  
  - These will be enabled only in the most extraordinary situations
  - These will not be saved to open search  

## Migration Guidance Step 1: Handle Existing Messages

### Deprecate Use of LoggerInf - use org.apache.logging.log4j.Logger directory
_777 instances of `org.cdlib.mrt.utility.LoggerInf.log(Error|Message)` in our *.java files_

- LoggerInf.logError --> Logger.error, Logger.warn or Logger.fatal
  - org.apache.logging.log4j.LogManager.getLogger().warn()
  - org.apache.logging.log4j.LogManager.getLogger().error()
- if DEBUG LoggerInf.logMessage 
  - org.apache.logging.log4j.LogManager.getLogger().debug()
  - org.apache.logging.log4j.LogManager.getLogger().trace()
- LoggerInf.logMessage 
  - org.apache.logging.log4j.LogManager.getLogger().info()

### Deprecate passing a Logger as a method parameter
- replace with calls to 
  - org.apache.logging.log4j.ThreadContext.put(key, value);
  - org.apache.logging.log4j.LogManager.getLogger().info()
  - org.apache.logging.log4j.LogManager.getLogger().warn()
  - org.apache.logging.log4j.LogManager.getLogger().error()
  - org.apache.logging.log4j.LogManager.getLogger().debug()

### Deprecate `if DEBUG` checks

_1265 instances of `if (DEBUG)` in the code base_

- Use org.apache.logging.log4j.LogManager.getLogger().debug()
- Unless it is computationally expensive...
  - For expensive operations use [Java Lambda for Lazy Logging](https://logging.apache.org/log4j/2.x/manual/api.html#java-8-lambda-support-for-lazy-logging)

### Deprecate System.out.print(ln)

_5298 instances of `System.out.print` in the code base_

- In general, replace these with 
  - org.apache.logging.log4j.LogManager.getLogger().debug()
  - org.apache.logging.log4j.LogManager.getLogger().info()

## Migration Guidance Step 2: Log Key Events 
- Assemble relevant details in a [ThreadContext](https://logging.apache.org/log4j/2.x/manual/thread-context.html)?
  - Should we create an Enum for all common key names??
- As key events are introduced, phase out old info/debug messages

## Generic Log Record Properties
- date
  - framework will insert this 
- time
  - framework will insert this 
- hostname
 - filebeat will insert this using infrastructure Ashley configures
- fqsn (microservice name)
 - filebeat will insert this using infrastructure Ashley configures
- log level (key-event, severe, error, warn, info, debug)
  - developer will control this 
- file, line, function
  - framework will insert this 

## Generic Log Record Properties - User Requests
- thread id
- internal request id (if available)
- request URL (where applicable)
- request IP (check with Marisa on the implications of storing this)

## Generic Log Record Properties - Key Events
- duration
  - we should find a class to help us compute duration
- create a utility class to log the following for key events 
  - bytes_read
  - bytes_written
  - retry attempts required
    - really valuable if/when we are evaluating new storage providers 

## Key attributes by service
_This describes an information object to be populated and submitted with each json log entry.  The object should be as fully populated as possible.  This would likely appear as a "custom" entry in the log json._

- UI
  - TBD: learn how to log a key event using the lograge framework 
  - all requests
    - user  (check with Marisa on the implications of storing this)
  - collection-level requests
    - collection_ark
    - collection_mnemonic (also called group)
    - search term
  - object/version/file level 
    - ark
    - version
    - path
    - nodenum
    - assembly-token
- Ingest
  - job/batch processing
    - batchid
    - jobid
    - queue id
    - collection-profile
    - submitter
    - manifest-item-url
  - object/file processing
    - ark
    - localid
    - filename
  - admin requests
    - store request URL    
- Storage
  - node
  - ark
  - version
  - file
- Inventory
  - queue-id
  - ark
  - version
  - file
  - localid
- Replication
  - node id
  - ark
  - ver (where applicable)
  - file (where applicable)  
- Audit
  - batch (date used to batch updates)
    - some failures may apply only at the batch level and may not be ark specific 
  - node id
  - ark
  - version
  - file
- Access
  - file requests
    - node
    - ark
    - version
    - file
  - assembly requests
    - token
    - queue id
    - ark
    - version (where applicable) 
- Admin Tool
  - User
  - Request
  - Parameters
  - where applicable (collection admin)
    - node
    - ark
    - version
    - file  

## Key events to log
- UI ALB
  - Is any ALB log info interesting to track and funnel to Open Search, or is this best to not clutter our logs
- UI
  - What would this enable?
    - Count logins
    - Count collection browse
    - Count collection search
    - Count object view
    - Count version view
    - Count file view
    - Count object assemble
    - Count object info by API
    - Count local id search via API
    - Count atom feed traversal
- Store
  - Every request/api call is a key event
    - some storage requests will not be handled by the ALB and should be logged explicitly 
  - Every file not saved is a key event 
  - Every file saved is a key event
  - Every checksum not verified is a key event 
  - Every checksum verified is a key event (debug mode)
- Ingest
  - Every request/api call is a key event (ALB can count)
  - Every queue task handled is a key event
  - Every manifest line item processed is a key event
- Inventory
  - Every request/api call is a key event (local id service)  (ALB can count) 
  - Every queue task handled is a key event
- Access    
  - Every request/api call is a key event (ALB can count)
  - Every queue task handled is a key event
- Audit
  - Every file not verified is a key event
  - Every file verified is a key event (debug mode)
    - Would this be too much?
    - Bytes read/written by node type
  - Every batch (inv_audits table) initiated is a key event 
  - Every batch (inv_audits table) updated is a key event 
- Replication
  - Every request/api call is a key event (admin tool calls directly) - no ALB
  - Every object replicated is a key event 
  - Every file not saved is a key event 
  - Every file saved is a key event (debug mode)
  - Every checksum not verified is a key event 
  - Every checksum verified is a key event (debug mode)
- Admin Tool
  - Every request/api call is a key event (admin tool calls directly)
- General Thoughts
  - API retries - how often is a retry needed?
    - calls to S3
    - calls to specific S3 provider
    - database retries
    - Otherwise... in the key event record - how many retries did it take?
    -   

## References
- https://github.com/CDLUC3/mrt-doc/issues/971

## Log4j2 Config File

- most online documentation seems to reference log4j2.xml - prefer this over yaml
- https://logging.apache.org/log4j/2.x/manual/configuration.html#automatic-configuration

```
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="WARN">
  <Appenders>
    <Console name="ECS-Console" target="SYSTEM_OUT">
      <EcsLayout serviceName="store" serviceNodeName="${env:HOSTNAME}"/>
    </Console>
    <RollingFile
        name="ECS-File"
        fileName="logs/log4j-ecs-json.log"
        filePattern="logs/log4j-ecs-json-%d{yyyy-MM-dd}-%i.log">
      <EcsLayout
          serviceName="store"
          serviceNodeName="${env:HOSTNAME}"
          eventDataset="tomcat.store"
          includeMarkers="true"
          stackTraceAsArray="true"
          includeOrigin="true"/>
      <Policies>
        <SizeBasedTriggeringPolicy size="19500KB" />
      </Policies>
      <DefaultRolloverStrategy max="10"/>
    </RollingFile>
  </Appenders>

  <Loggers>
    <Root level="info">
      <AppenderRef ref="ECS-Console"/>
      <AppenderRef ref="ECS-File"/>
    </Root>
  </Loggers>
</Configuration>
```

