# @web-pacotes/github-upsert

## 0.0.4

### Patch Changes

- ec0e3a7: fixes: bug on execution environment check which didn't allow package to be used in a Cloudflare Workers environment, since window is undefined but Buffer is also undefined

## 0.0.3

### Patch Changes

- 5ba363f: Package now supports server-side and web environments on encoding file content as base64 string

## 0.0.2

### Patch Changes

- 73b7d95: fix badges pointing to incorrect package

## 0.0.1

### Patch Changes

- 09b3536: - Initial version of github-upsert
  - Support for native fetch
