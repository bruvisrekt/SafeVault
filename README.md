# SafeVault
# Digital Asset Manager

A web-based database application for managing digital assets, built as a part of Database Systems course.

## Overview

This application allows users to manage digital assets and their associated information including financial assets, social assets, beneficiaries, credentials, and access triggers. It is built on a fully normalized relational schema and provides a front-end interface for performing database operations.

## Tech Stack

- **Front-end** — HTML, CSS, JavaScript
- **Back-end** — Node.js with Express
- **Database** — Oracle Database 21c Express Edition (XE)
- **Oracle Driver** — oracledb (npm)

## Project Structure

```
digital_asset_app/
│
├── server.js
├── package.json
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
```

## Prerequisites

Make sure the following are installed on your machine before running the application.

- Node.js (v18 or above)
- Oracle Database 21c Express Edition
- npm

## Setup and Installation

**1. Clone or download the project folder**

**2. Navigate to the project directory**
```
cd digital_asset_app
```

**3. Install dependencies**
```
npm install
```

**4. Configure the database connection**

Open `server.js` and update the `dbConfig` block with your Oracle XE credentials.
```javascript
const dbConfig = {
    user: "your_username",
    password: "your_password",
    connectString: "localhost/xepdb1"
};
```

**5. Set up the database**

Open SQL Plus and connect to the `xepdb1` container.
```sql
ALTER SESSION SET CONTAINER = xepdb1;
```

Run all the CREATE TABLE statements followed by the INSERT ALL statements and commit.

## Running the Application

**Step 1 — Start the Oracle listener**
```
lsnrctl start
```

**Step 2 — Start the Node.js server**
```
node server.js
```

**Step 3 — Open the application in your browser**
```
http://localhost:3000
```

## Features

- View all digital assets
- Navigate to first and last record
- Search assets by name
- View total financial asset value grouped by owner
- Insert new asset records
- Update existing asset names
- Delete asset records
- Tabular display of all query results

## Database Schema

The application uses a fully normalized schema in Boyce-Codd Normal Form consisting of the following ten relations.

| Table | Description |
|---|---|
| account_owner | Stores digital asset owner information |
| digital_asset | Stores all digital asset records |
| asset_metadata | Stores metadata for each digital asset |
| financial_asset | Stores financial asset details |
| social_asset | Stores social media asset details |
| platform_profile | Stores platform username and profile URL |
| access_trigger | Stores access trigger rules per owner |
| asset_credential | Stores credentials associated with assets |
| designated_heir | Stores beneficiary assignments per asset |
| beneficiary | Stores beneficiary information |

## Notes

- The application runs entirely on localhost and requires Oracle XE to be running before starting the server.
- If the machine is restarted, run `lsnrctl start` before starting the server.
- All tables must be created inside the `xepdb1` pluggable database container.
