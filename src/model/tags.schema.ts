import { Schema, model, Types } from "mongoose";
import { Status } from "../enums/tag.enum";

interface ITag {
    title : string;
    description : string;
    status : string;
    deadlines : string;
}

const TagSchema = new Schema({
    title: { type: String, require: true },
    userId : { type : Types.ObjectId, require : true, ref : 'user'},
    description: { type: String, require: true },
    state: { type: String, require: true, default : Status.ASSIGNED  },
    deadlines : { type : String, require : true}
}, {
    timestamps: true
});

const TagModel = model<ITag>("tag", TagSchema);
export default TagModel;