
* **Front-end** AngularJS 1.x + PrimeUI + custom CSS  
* **Back-end** Node 18 + Express (TypeScript)  
* **Storage** Form drafts are saved in the browser’s **localStorage** – no database needed  
* **Ports** API → `3000` | UI → `5173`


[Demo Video](https://example.com)


## 💻 Local Setup Instructions

```bash
# 1 · Clone the repo
git clone https://github.com/tinyHiker/PRO_Portal.git
cd PRO_Portal

# 2 · Install & run the back-end
cd backend
npm install          # express, cors, typescript, ts-node-dev …
npm run dev          # hot-reload server (leave this tab running)

# 3 · Install & run the front-end (in a new terminal)
cd ../frontend
npm install          # pulls http-server dev dep
npm run serve        # serves UI on http://localhost:5173
