import { Request, Response, NextFunction } from "express";
import { ITag } from "../interface/tags.interface";
import TagModel from "../model/tags.schema";

export const createTag = async (req: Request, res: Response) => {
    try{
        const { user } = req;

    const { title, description, deadlines, status }: ITag = req.body;

    const createTags = await TagModel.create({
        title,
        description,
        deadlines,
        status,
        userId: user,
    });

    await createTags.save();

    res.status(201).send({ createdTag: createTags });
    } catch(err){
        res.status(501).send({err : "Internal Server Error"});
    }
};

export const listTags = async (req: Request, res: Response) => {
    try{
        const { user } = req;

    const list = await TagModel.find({ userId: user });
    res.status(200).send(list);
    }catch(err){
        res.status(501).send({err : "Internal Server Error"});
    }
};

export const updateTag = async (req: Request, res: Response, next: NextFunction) => {
try{
    const { id } = req.params;
    const { title, description, status, deadlines }: ITag = req.body;
    const { user } = req;
    const doesExist = await TagModel.findOne({ _id: id });
    if (!doesExist) return res.status(404).send({ msg: `Tags ${id} id doesn't exist !` });

    const updateTag = await TagModel.updateOne(
        {
            $and: [
                { _id: id },
                { userId: user }
            ]
        },
        { $set: { title, description, deadlines } },
        { new: true }
    );

    res.status(201).send({
        msg: "Tag got upadted yet!",
        updatedTag: updateTag,
    });
}catch(err){
    res.status(501).send({err : "Internal Server Error"});
}
};
export const updateStatus = async (req: Request, res: Response) => {
try{
    const { id } = req.params;
    const { user } = req;
    const { status }: ITag = req.body;
    const doesExist = await TagModel.findOne({ _id: id });
    if (!doesExist) return res.status(404).send({ msg: `Tags ${id} id doesn't exist !` });

    const updateTag = await TagModel.updateOne(
        {
            $and: [
                { _id: id },
                { userId: user }
            ]
        },
        { $set: { status } },
        { new: true }
    );

    res.status(201).send({
        msg: "Tag's status got upadted yet!",
        updatedTag: updateTag,
    });
}catch(err){
    res.status(501).send({err : "Internal Server Error"});
}
};
export const deleteTag = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
    const { user } = req;
    const doesExist = await TagModel.findOne({ _id: id });
    if (!doesExist) return res.status(404).send({ msg: `Tags ${id} id doesn't exist !` });
    const deleteTag = await TagModel.deleteOne(
        {
            $and: [
                { _id: id },
                { userId: user }
            ]
        }
    );
    res.status(201).send({
        msg: "Tag deleted yet!",
        deletedTag: deleteTag,
    });
    } catch(err) {
        res.status(501).send({err : "Internal Server Error"});
    }
};
