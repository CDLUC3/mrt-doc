---
title: "Request object assembly"
description: "The Merritt UI initiates an object/version assembly (for download)"
nextpage: store-obj2
chart: overview-core.mmd
---
{% include mermaid.html %}
{% include start.html %}
  UI ---> |assembly req| STACC
  class STACC FOCUS
  linkStyle 18 stroke:red,stroke-width:3px
{% include end.html %}
