const mongoose = require("mongoose");
const toml = require("toml");
const fs = require("fs");
const path = require("path");

const dbPreset = process.env.db || "local";
const dbConfig = toml.parse(
    fs.readFileSync(path.join(__dirname, "..", "conf", "db.toml")).toString()
)[dbPreset];
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

let options = {};
if (dbConfig.user) {
    options = {
        user:dbConfig.user,
        pass:dbConfig.password,
        auth: {
            authdb: "admin"
        }
    };
}

mongoose.connect(
    `mongodb://${dbConfig.ip}:${dbConfig.port}/${dbConfig.name}`,
    Object.assign({
        useNewUrlParser: true,
    },options)
);
const mdb = mongoose.connection;
mdb.on("error", console.log.bind(console, "connection error:"));
mdb.once("open", () => {
    console.log("db is connected!");
});
const toObjectTransform = {
    transform: (doc, ret) => {
        delete ret.__v;
        // delete ret._id;
    }
};

const projectSchema = new mongoose.Schema(
    {
        creator: String,
    },
    {
        toObject: toObjectTransform
    }
);

// const projectModel = mongoose.model("project", projectSchema);

module.exports = {

};
