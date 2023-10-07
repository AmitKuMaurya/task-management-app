
import {Request, Response} from "express"
import { ITag } from "../interface/tags.interface"
import TagModel from "../model/tags.schema";
export const createTag = async (req : Request,res : Response) => {

    const {user} = req;
    console.log('user: ', user);

    const {title,description,deadlines,status} : ITag = req.body;

    const createTags = await TagModel.create({
        title,
        description,
        deadlines,
        status,
        userId : user
    });

    await createTags.save();

    res.status(201).send({createdTag : createTags});

}

export const listTags = async (req : Request, res : Response) => {
    const {user} = req;

    const list = await TagModel.find({userId : user});
    res.status(200).send(list);
}

export const updateTag = async (req : Request, res : Response) => {

}
export const updateStatus = async (req : Request, res : Response) => {
    
}
export const deleteTag = async (req : Request, res : Response) => {

}
 