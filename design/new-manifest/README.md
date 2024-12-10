# New Manaifest Type

## Associated Tickets
- https://github.com/CDLUC3/mrt-doc/issues/1136

## Potential Schema

```yaml
authentication-method:
  id:
  default: # default: true; applies to all retrievals unless otherwise specified
  type: # default: none; none | basic | api-key | cognito | api-gw | aws-enabled
  # assumption that users would reference known credentials rather than re-supplying on-demand
  basic:
    user:
    password:
  api-key:
    header:
    value:
  api-gw:
    header:
    value:
  cognito: #tbd
  aws-enabled: # no parameters specified, this indicates that Merritt servers have network-enabled permissions to pull the resource
batch-manifests:
- url: # http:, https:, file:, s3: should be supported
  size:
  mime:
  fixity: # is this applicable for a manifest
    algorithm:
    value:
  authentication-method-id: # if different from the default
containers: # Terry would really like to drop support for this
- url: # http:, https:, file:, s3: should be supported
  size:
  mime:
  fixity: # is this applicable for a manifest
    algorithm:
    value:
  authentication-method-id: # if different from the default
objects:
- primary-id:
  local-id:
  -
  erc-who:
  erc-what:
  erc-when:
  files:
  - url: # http:, https:, file:, s3: should be supported
    merritt-pathname:
    size:
    mime:
    fixity: # is this applicable for a manifest
      algorithm:
      value:
    authentication-method-id: # if different from the default
metadata-replacement
- primary-id:
  local-id:
  -
  erc-who:
  erc-what:
  erc-when:
```
