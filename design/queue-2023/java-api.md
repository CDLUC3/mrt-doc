# Merritt ZK Java API

## States

```java
package org.cdlib.mrt;

public interface IngestState {
  public List<IngestState> nextStates();
  public String name();
  public IngestState stateChange(IngestState next);
  default boolean isDeletable();
  default boolean stateChangeAllowed(IngestState next);
  default IngestState success();
  default IngestState fail();
  public static JSONObject statesAsJson(IngestState[] values);
}

public enum BatchState implements IngestState{
  Pending,
  Held,
  Processing,
  Reporting ,
  Failed,
  UpdateReporting,
  Completed,
  Deleted;
}

public enum JobState implements IngestState {
  Pending,
  Held,
  Estimating,
  Provisioning,
  Downloading,
  Processing,
  Recording,
  Notify,
  Failed,
  Completed,
  Deleted;
}

```

## ZK Node Keys

```java
public enum ZKKey {
  STATUS("status"),
  LOCK("lock"),
  BATCH_SUBMISSION("submission"),
  BATCH_STATUS_REPORT("status-report"),
  JOB_CONFIGURATION("configuration"),
  JOB_IDENTIFIERS("identifiers"),
  JOB_PRIORITY("priority"),
  JOB_SPACE_NEEDED("space_needed"),
  JOB_BID("bid");
}
```

## Merritt ZK API

```java
public class MerrittZKNodeInvalid extends Exception {
  public MerrittZKNodeInvalid(String message);
}

public class MerrittStateError extends Exception {
  public MerrittZKNodeInvalid(String message);
}

abstract public class QueueItem 
  private String id;
  private JSONObject data;
  private IngestState status;

  public QueueItem(String id);
  public QueueItem(String id, JSONObject data);
  public String id();
  public JSONObject data();
  public IngestState status();
  public void loadProperties(ZooKeeper client) throws MerrittZKNodeInvalid;
  public String stringProperty(ZooKeeper client, ZKKey key) throws MerrittZKNodeInvalid;
  public JSONObject jsonProperty(ZooKeeper client, ZKKey key) throws MerrittZKNodeInvalid;
  public int intProperty(ZooKeeper client, ZKKey key) throws MerrittZKNodeInvalid;
  public long longProperty(ZooKeeper client, ZKKey key) throws MerrittZKNodeInvalid;
  public void setData(ZooKeeper client, ZKKey key, Object data) throws MerrittZKNodeInvalid;

  public abstract String dir();
  public abstract String prefix();
  public abstract IngestState initState();
  public abstract IngestState[] states();
  public String path();
  public abstract IngestState resolveStatus(String s);

  public static String serialize(Object data);
  public static String createId(ZooKeeper client, String prefix);
  public JSONObject statusObject(IngestState status);
  public void setStatus(ZooKeeper client, IngestState status) throws MerrittZKNodeInvalid;
  public boolean lock(ZooKeeper client) throws MerrittZKNodeInvalid;
  public boolean unlock(ZooKeeper client) throws MerrittZKNodeInvalid;
  public abstract void delete(ZooKeeper client) throws MerrittStateError;
}

public class Batch extends QueueItem {
  private boolean hasFailure;

  public Batch(String id);
  public Batch(String id, JSONObject data);

  public boolean hasFailure();

  public String dir();
  public String prefix();
  public IngestState initState();
  public IngestState[] states();
  public static String prefixPath();
  public IngestState resolveStatus(String s);

  public static Batch createBatch(ZooKeeper client, JSONObject submission);

  public void delete(ZooKeeper client) throws MerrittStateError;

  public static Batch aquirePendingBatch(ZooKeeper client);
  public static Batch aquireCompletedBatch(ZooKeeper client);
}

public class Job extends QueueItem {
  private String bid;
  private int priority;
  private long space_needed;
  private String jobStatePath;
  private String batchStatePath;

  public String dir();
  public String prefix();
  public IngestState initState();
  public IngestState[] states();
  public static String prefixPath();
  public IngestState resolveStatus(String s);

  public Job(String id, String bid);
  public Job(String id, String bid, JSONObject data);

  public static String dir();
  public static String prefix();
  public static String prefixPath();
  public String bid();
  public int priority();
  public long spaceNeeded();

  public static Batch createJob(ZooKeeper client, String bid, JSONObject configuration);
  @Override public void loadProperties(ZooKeeper client);
  public void setPriority(ZooKeeper client, int priority);
  public void setSpaceNeeded(ZooKeeper client, long space_needed);
  public void setStatus(ZooKeeper client, IngestState status);
  public String batch_state_subpath();
  public void setBatchStatePath(ZooKeeper client);
  public void setJobStatePath(ZooKeeper client);

  public void delete(ZooKeeper client) throws MerrittStateError;

  public JSONObject statusObject(IngestState status);
  public static Job acquireJob(ZooKeeper client, IngestState status);
}


```
