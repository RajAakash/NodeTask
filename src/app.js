import express from "express";
import { connectDB } from "./db/mongoose.js";
import taskRouter from "./router/task";
import path from "path";

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use("/", taskRouter);

app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, () => {
  console.log("listening on port 3000.");
});
