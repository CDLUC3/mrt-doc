# Merritt Consolidated Logging

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
- if DEBUG LoggerInf.logMessage --> Logger.debug or Logger.trace
- LoggerInf.logMessage --> Logger.info or Logger.debug based on importance of the message

### Deprecate passing a Logger as a method parameter
- eliminate the parameter or replace with with a MerrittKeyEventLoggable (see below)

### Deprecate `if DEBUG` checks

_1265 instances of `if (DEBUG)` in the code base_

- Unless it is computationally expensive...
  - Call `Logger.debug` and allow the logger to determine the action

### Deprecate System.out.print(ln)

_5298 instances of `System.out.print` in the code base_

- In general, replace these with Logger.debug or Logger.trace
- If the message is more critical, use Logger.info, Logger.warn, Logger.error

## Migration Guidance Step 2: Log Key Events 
- Details for logging key events are TBD
- Each service will have a custom MerrittKeyEventLoggable object to log with each message
- As key events are introduced, phase out old info/debug messages
- Where applicable, add the MerrittKeyEventLoggable to warn/error/fatal messages

- mrt-core
  - interface MerrittKeyEventLoggable
  - class DefaultMerrittKeyEvent implements MerrittKeyEventLoggable
- mrt-cloud
  - class MerrittCloudKeyEvent extends DefaultMerrittKeyEvent
- cld-zk-zoo
  - class MerrittQueueKeyEvent extends DefaultMerrittKeyEvent
- mrt-ingest
  - class IngestKeyEvent extends MerrittQueueKeyEvent 
- mrt-store
  - class StorageKeyEvent extends MerrittCloudKeyEvent
  - class AccessQueueKeyEvent extends MerrittQueueKeyEvent
- mrt-inventory
  - class InventoryDBEvent extends DefaultMerrittKeyEvent
  - class InventoryQueueKeyEvent extends MerrittQueueKeyEvent
- mrt-audit
  - class AuditKeyEvent extends MerrittCloudKeyEvent
  - class AuditDBKeyEvent extends DefaultMerrittKeyEvent 
- mrt-replic
  - class ReplicKeyEvent extends MerrittCloudKeyEvent
  - class ReplicDBKeyEvent extends DefaultMerrittKeyEvent 
