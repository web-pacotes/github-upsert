# @web-pacotes/github-upsert

## 0.0.7

### Patch Changes

- 947c14f: feat: add support for getting commit blob for file upsert

## 0.0.6

### Patch Changes

- 65a7cbd: - show url and raw content url for each that has been supported
  - added support for upserting a folder (with recursive support)

## 0.0.5

### Patch Changes

- 81caf4f: feat: add support for upserting files within the CLI

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
