## Non working PDF
https://merritt-stage.cdlib.org/m/ark%253A%252F99999%252Ffk4st8xj9j

## Copy Non working PDF to Another Object
```
$aws s3 cp "s3://dryad-assetstore-merritt-stage/ark:/99999/fk4st8xj9j|1|producer/Merritt APIs.pdf" "s3://dryad-assetstore-merritt-stage/terrytest.pdf"
copy: s3://dryad-assetstore-merritt-stage/ark:/99999/fk4st8xj9j|1|producer/Merritt APIs.pdf to s3://dryad-assetstore-merritt-stage/terrytest.pdf
```
## Display Object Info
```
$ aws s3api head-object --bucket "dryad-assetstore-merritt-stage" --key "terrytest.pdf"
{
    "AcceptRanges": "bytes", 
    "ContentType": "text/plain", 
    "LastModified": "Fri, 13 Mar 2020 00:15:39 GMT", 
    "ContentLength": 453573, 
    "ETag": "\"1c0ed7b0578f44a26db73a201b4283c5\"", 
    "Metadata": {
        "sha256": "a3fff583f54a5ab2fdf8b17528f7dafaa44470cb81e18ccaf5bfe4ffd3be588c"
    }
}
```
## Create Presigned URL
```
$ presign=`aws s3 presign "s3://dryad-assetstore-merritt-stage/terrytest.pdf"`
```

## Download URL... Note the ContentType Header
```
$ curl -v --output /dev/null $presign
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0*   Trying 52.218.208.162...
* TCP_NODELAY set
* Connected to dryad-assetstore-merritt-stage.s3.amazonaws.com (52.218.208.162) port 443 (#0)
...
> GET /terrytest.pdf?AWSAccessKeyId=ASIAWSMX3SNW22XR6OOA&Expires=1584063466&x-amz-security-token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJGMEQCIEU10bkspLPq%2BFb3sMbzhriuQ051g1yMlFX3g%2FVdH%2BXoAiAh4l5pLlYJ5OaJVQutUg0tRmzWezAJmBgDUxEWcmIGMiq0Awg5EAAaDDQ1MTgyNjkxNDE1NyIMENqpWu67%2BjUaZovXKpED3suUNeQVmeEKGmi8ZH2N%2BB48iRiw4lxHTZrQPu4w8Whzi4jbwS2iF1CfE7pfIBpwR14dIM1e3ie6WCcvN7TVaIvX6h57suHIBirehGjOlZHXoeAP%2F2SgXliMGPfMgVFKUcbRz%2F3dO9uMatCMQBsy7%2FINwsHdcEjYJ%2BBs9N3EpaTSN127f8%2FuDaTza0JsNPnE6ufDZ37691cWeqFVyw5JTd4WqMx%2BeGBtf10a0Qemg2HJoUJZPU9CeNWOoUjrAaas3T2NBOTviWhklAtaXoJX%2F3LbRnJZKX3mLVE%2FX3TtSNo6fCEibhh9UhrQICvTScJgd4iejXC27ly587a809cLxU0zzqWZE6ESo%2BmgxoROSxfk1mcWyWw8PvdUZtjEEeIDJCUQdQhYk0twav2W6f%2FAL4xi2lwjtteTyTXbpVVUMKbVZoHo3WhIspCJFE9l3HYFzY9iPkcLjBJp8vuuQtPrCW6MyuFL6ZYcK9XPHWe%2BRprb%2BmfEbyvY7sTBdGGa4Vm1o0QQZulYzekR7lOOhCv3AUEwhpCr8wU67AG%2F4u5KcreohaS3BRQlCeNuqGrJD7PBegK1R93xPtQN2y%2FCJIrxJAdiq0p4tVRFTsPzGHXsAJIvcVSydFnJieJAa2u%2F1B1dNBZWrDKOTD96lNYIgTUwTZzVUnQRtRnjvLtZUOIyyF6KiepNG5lj8LCUVQzGaD%2F2kLNBC%2BcW2YsXOOTjCEimdkwkrQeW4s3TeT70%2FDQKUc7h6VAUGiF6RRcd0FzeZRLM11d7ugxr1RBFS04FOhw%2FH%2Bar0At2kwdLgfG5Ghade0c2Vc6FbJUSDQUyDR3hDX%2BLvDAJ%2BbS%2BnqYFLHzAHdFmicQEyjYr7g%3D%3D&Signature=v2BVg0GqjcmykifOyOub3C8K84A%3D HTTP/1.1
> Host: dryad-assetstore-merritt-stage.s3.amazonaws.com
> User-Agent: curl/7.61.1
> Accept: */*
> 
{ [5 bytes data]
< HTTP/1.1 200 OK
< x-amz-id-2: rNOIIRpYHW9pWEMSx0VRS/ly//N0uhRpJrA6ik8CajeUs+slIvuUDofjXbPbsOc/V6UcPSlbir0=
< x-amz-request-id: E9EDC6C8DF38F15F
< Date: Fri, 13 Mar 2020 00:38:23 GMT
< Last-Modified: Fri, 13 Mar 2020 00:15:39 GMT
< ETag: "1c0ed7b0578f44a26db73a201b4283c5"
< x-amz-meta-sha256: a3fff583f54a5ab2fdf8b17528f7dafaa44470cb81e18ccaf5bfe4ffd3be588c
< Accept-Ranges: bytes
< Content-Type: text/plain
< Content-Length: 453573
< Server: AmazonS3
< 
{ [5 bytes data]
100  442k  100  442k    0     0  5985k      0 --:--:-- --:--:-- --:--:-- 5985k
* Connection #0 to host dryad-assetstore-merritt-stage.s3.amazonaws.com left intact
```

## Override the ContentType Header for the Object
```
$ aws s3 cp --content-type "application/pdf" "s3://dryad-assetstore-merritt-stage/terrytest.pdf" "s3://dryad-assetstore-merritt-stage/terrytest.pdf" --metadata-directive REPLACE
copy: s3://dryad-assetstore-merritt-stage/terrytest.pdf to s3://dryad-assetstore-merritt-stage/terrytest.pdf
```
## Verify the Header Change
```
$ aws s3api head-object --bucket "dryad-assetstore-merritt-stage" --key "terrytest.pdf"
{
    "AcceptRanges": "bytes", 
    "ContentType": "application/pdf", 
    "LastModified": "Fri, 13 Mar 2020 00:40:09 GMT", 
    "ContentLength": 453573, 
    "ETag": "\"1c0ed7b0578f44a26db73a201b4283c5\"", 
    "Metadata": {}
}
```
## Recreate the Presigned URL
```
$ presign=`aws s3 presign "s3://dryad-assetstore-merritt-stage/terrytest.pdf"`
```

## Download the Presigned Object -- Note the ContentType Header
```
$ curl -v --output /dev/null $presign
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0*   Trying 52.218.233.155...
* TCP_NODELAY set
* Connected to dryad-assetstore-merritt-stage.s3.amazonaws.com (52.218.233.155) port 443 (#0)
...
> GET /terrytest.pdf?AWSAccessKeyId=ASIAWSMX3SNW67NUKSAF&Expires=1584063630&x-amz-security-token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCIDznvLkXnQnlY8ma8Y9AbLODjVIZWsqEKFIofLug80zzAiAxyHEB02I6PHn%2FF%2FXGlyUZF4vK0dlBSXOFGgmdURjDfSq0Awg6EAAaDDQ1MTgyNjkxNDE1NyIM3CcKy15zSjuhZx0%2BKpED4lc6m0qvZ%2BBEo1xKU1Hi35byqCqq%2FXoUmMwj%2FUDROjJ07BNY1YG0v8rhIoYdrki1uFzQXHcYQFWL3uqxlLOstX09oBpVYQ0nY3wACMAMQSjiUxNJ7h4s%2BenvoU%2F8RAzKq%2F%2BvoTruA%2Ba2GW%2FU6pqCHJwt3PGIvA%2Br5w%2FXnMzZYu0wrmMoNX9Ef2Ma5ZZilQ10BtAqCSWpU1LiJiMnvYUilIP%2FkK1RPQXCHj5pp%2FQsXSdVh1Bgfu%2BW6%2BZbVTgl4%2BmVKYFAlEBDmvQGQFHrfPxQs7OO%2Bc2YW88OSAc042ILH%2FA9Yh2E0o7HedvYH9zy0XyjeBRcw95pOj67Hx0bzEKczKTZ9ZugJrtbGymcCJyTrpOl2WznxEGWhpStgYAWwea7ZwbDQJkqGS69zZ993G90tcVxiCIPWRG1wykMQ%2Ft%2BnGkLI1liVvEo2%2F7D5nKdzmVv1%2BBROwZACdlmd4Y%2ByMYxjTdllujpy%2BLTRVRoszzeFLfPBUlPHJ1a3SIzCl9Bqo5xMQ9wGvXeB8M72X32jZNA1Zgwt6yr8wU67AFNduiqQquYS9IGdGuPxINIgGDuGB2h9xUp7kMEfmIvsJMnYJDx%2FQ9%2Fjw8KA%2BkNHBBzRGVHZhCiaKDL3yDKoBq1rorPX0h1%2BBt0otsqHQ96lK0UvgMC2UFbQK%2FNc9GWmFA6Qg8LG6JJIK50SslCv22cKPkOJdWoQB2xJAwS5Y%2F5G7WEF7P7bslTdjvct9GXbe5IB%2FwSu9rdgFutIhp%2FCPEuEy%2Bnsa%2FicCZBZHhvRVr%2Fp4tpwr35HCR0n%2B7HgXsiNxa0XlU7W6onyFiyFW9N8hPovvdf4upSHTUc8%2FNkPxIh3OzRgqHJvRC8CTd6Bw%3D%3D&Signature=r4hHSU4Pm8jo04xRROJBqhKNkY0%3D HTTP/1.1
> Host: dryad-assetstore-merritt-stage.s3.amazonaws.com
> User-Agent: curl/7.61.1
> Accept: */*
> 
{ [5 bytes data]
< HTTP/1.1 200 OK
< x-amz-id-2: YGHVDAytINKjhFbo/B2IWQmWcOXhwGLw6ZNEwJninijcsedwFKwhLCKVFqk+ckDTXBGQ/BvYjkc=
< x-amz-request-id: 48A3AFB478E44F4A
< Date: Fri, 13 Mar 2020 00:40:42 GMT
< Last-Modified: Fri, 13 Mar 2020 00:40:09 GMT
< ETag: "1c0ed7b0578f44a26db73a201b4283c5"
< Accept-Ranges: bytes
< Content-Type: application/pdf
< Content-Length: 453573
< Server: AmazonS3
< 
{ [5 bytes data]
100  442k  100  442k    0     0  7144k      0 --:--:-- --:--:-- --:--:-- 7144k
* Connection #0 to host dryad-assetstore-merritt-stage.s3.amazonaws.com left intact
```
