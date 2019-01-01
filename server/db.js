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
        user: dbConfig.user,
        pass: dbConfig.password,
        auth: {
            authdb: "admin"
        }
    };
}

mongoose.connect(
    `mongodb://${dbConfig.ip}:${dbConfig.port}/${dbConfig.name}`,
    Object.assign({
        useNewUrlParser: true,
    }, options)
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
const voteSchema = new mongoose.Schema({
    title: String,
    description: String,
    list: [{
        title: String,
        $uid: String,
    }],
    anonymous: Boolean,
    random: Boolean,
    multiple: Boolean,
    maximum: Number,
    deadline: Number,
});
const voteModel = mongoose.model("vote10", voteSchema);

async function createVote(params) {
    const result = await new voteModel(params).save();
    return {
        code: 0,
        data: result
    }
}

async function getVote(_id) {
    return {
        code: 0,
        data: (await voteModel.findById(_id))
    };
}


module.exports = {
    createVote,
    getVote
};
