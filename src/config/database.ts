import mongoose from "mongoose";

const dbConnection = mongoose.connect(`mongodb://amit69maurya69:amit69maurya69@ac-yvv3reh-shard-00-00.hggqa0x.mongodb.net:27017,ac-yvv3reh-shard-00-01.hggqa0x.mongodb.net:27017,ac-yvv3reh-shard-00-02.hggqa0x.mongodb.net:27017/?ssl=true&replicaSet=atlas-3naud5-shard-0&authSource=admin&retryWrites=true&w=majority`)
    .then(() => {
        console.log({ msg: `DataBase Connected Susscessfully !` })
    })
    .catch((err) => {
        console.log({ error: err });
        process.exit(1);
    })

export default dbConnection;