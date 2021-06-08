# lets.Get(IT).work - Resume Builder App

<img src='https://img.shields.io/github/checks-status/olimstv/resume-builder-app/6f2b9d02a4319f7152423ff746958230c8097f19'/> <img src='https://img.shields.io/github/issues/olimstv/resume-builder-app'> <img src="https://img.shields.io/website?down_color=red&down_message=orange&up_color=green&up_message=up&url=https%3A%2F%2Fletsmakeit.com"/> <img src='https://www.codefactor.io/repository/github/olimstv/resume-builder-app/badge' />

#### An open-source web application for fast and easy creation and publishing (with unique public URL) of resumes "tailored" for each particular vacancy.

## Main idea behind
Sometimes job application process might be daunting. To get the dream job, developers (especially novice ones) need to apply hundreds of times. And each time, the resume must be "tailored" for each particular position. This application aimed to give developers the ability to spend their time improving their skills instead of composing dozens of resumes daily.
Once filling in all relevant information about qualification, work experience, etc., to the personal profile, the user
can combine each resume according to the ad's requirements. 

## Key features
User can:
- create/edit profile
- compose/edit resume
- set custom resume title (to be displayed on the dashboard)
- set custom slug (slug will be a part of the public URL)
- publish and/or save each created resume
- published resume has unique URL (containing it's slug)
- everyone (read potential employer) can visit resume's url to read and/or download resume

Besides publishing resume, user can download it as a PDF or JSON document. The JSON output is compatible with [JSONResume](https://jsonresume.org).

## Contributors
Thanks very much to my dear friend and mentor, who's inspired me to build the app <br>
[<img src="https://avatars.githubusercontent.com/u/282177?v=4" width="100px;"/><br /><b>Anton A.</b>](https://github.com/meglio)<br/>
## Contributing
Contributions are very welcome, and I am always happy to help out first-timers contributors with any questions you may have. Please check out the [Installation](#installation) and [Configuration](#configuration) instructions below for a guide on how to get started on working on the app.
## Installation
Clone repository

```bash
git clone https://github.com/olimstv/resume-builder-app.git
```

## Configuration

### Set up a MongoDB database

Set up a MongoDB database either locally or with [MongoDB Atlas for free](https://mongodb.com/atlas).

### Set up environment variables

Copy the `env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Set each variable on `.env.local`:

- `MONGODB_URI` - Your MongoDB connection string. If you are using [MongoDB Atlas](https://mongodb.com/atlas) you can
  find this by clicking the "Connect" button for your cluster.
- `MONGODB_DB` - The name of the MongoDB database you want to use.

### Run Next.js in development mode

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```

The app should be up and running on [http://localhost:3000](http://localhost:3000)! If it doesn't work, log an issue on
[GitHub issues](https://github.com/olimstv/resume-builder-app/issues).

You will either see a message stating "You are connected to MongoDB" or "You are NOT connected to MongoDB". Ensure that
you have provided the correct `MONGODB_URI` and `MONGODB_DB` environment variables.

When you are successfully connected, you can refer to
the [MongoDB Node.js Driver docs](https://mongodb.github.io/node-mongodb-native/3.4/tutorials/collections/) for further
instructions on how to query your database.

