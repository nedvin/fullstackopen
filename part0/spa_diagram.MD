```mermaid
sequenceDiagram
Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/spa
Server-->>Browser: 200 OK (spa.html)
Note left of Browser: Browser sees it must fetch styles and scripts
Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
Server-->>Browser: 200 OK (main.css)
Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
Server-->>Browser: 200 OK (spa.js)
Note left of Browser: Executes script which includes fetching notes
Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
Server-->>Browser: 200 OK (data.json)
Note left of Browser: Renders the notes
```
