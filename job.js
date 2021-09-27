const express = require("express");

const mongoose = require("mongoose");

// connection:

const connect = () => {
  return mongoose.connect("mongodb://127.0.0.1:27017/job_company");
};

// creating jobs schema:

const jobSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  job: { type: String, required: true },
  city: { type: String, required: true },
  workFromHome: { type: Boolean, required: true },
  noticePeriod: { type: Boolean, required: true },
  rating: { type: Number, required: true },
  openJobs: { type: Number, required: true },
});

// requirement for mongoose:

const Jobs = mongoose.model("jobs", jobSchema);

const app = express();

app.use(express.json());

// CRUD's for API's:

// get all jobs:
app.get("/jobs", async (req, res) => {
  const job = await Jobs.find();

  res.status(200).send({ job });
});

// get all jobs in particular city:
app.get("/city", async (req, res) => {
  const job = await Jobs.find({ city: "Aba" });

  res.status(200).send({ job });
});

// get all work from home jobs :
app.get("/wfh", async (req, res) => {
  const job = await Jobs.find({ boolean: true, string: "workFromHome" });

  res.status(200).send({ job });
});

// get all jobs with 2 months notice period :
app.get("/noticePeriod", async (req, res) => {
  const job = await Jobs.find({ boolean: true, string: "noticePeriod" });

  res.status(200).send({ job });
});

// sort all jobs as per ratings :
app.get("/sort", async (req, res) => {
  const job = await Jobs.find().sort({ rating: -1 });

  res.status(200).send({ job });
});

// companies with most open jobs :
app.get("/open", async (req, res) => {
  const job = await Jobs.find({ openJobs: { $eq: 50 } });

  res.status(200).send({ job });
});

// server:

app.listen(6565, async () => {
  await connect();
  console.log("Hey There I m Back");
});
