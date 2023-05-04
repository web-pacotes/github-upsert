---
'@web-pacotes/github-upsert': patch
---

fixes: bug on execution environment check which didn't allow package to be used in a Cloudflare Workers environment, since window is undefined but Buffer is also undefined
