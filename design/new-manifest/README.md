# New Manaifest Type

```yaml
authentication-method:
  id:
  default: # default: true; applies to all retrievals unless otherwise specified
  type: # default: none; none | basic | api-key | cognito | aws-enabled
  basic:
    user:
    password:
batch-manifests:
- url: # http:, https:, file:, s3: should be supported
  size:
  fixity: # is this applicable for a manifest
    algorithm:
    value:
  date: # why does Merritt care?
containers: # Terry would really like to drop support for this
- url: # http:, https:, file:, s3: should be supported
  size:
  fixity: # is this applicable for a manifest
    algorithm:
    value:
  date: # why does Merritt care?
objects:
- primary_id:
  local_id:
  erc_who:
  erc_what:
  erc_when:
  files:
  - url: # http:, https:, file:, s3: should be supported
    size:
    fixity: # is this applicable for a manifest
      algorithm:
      value:
    date: # why does Merritt care?
```
