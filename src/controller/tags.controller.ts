import { Request, Response } from "express";
import { ITag } from "../interface/tags.interface";
import TagModel from "../model/tags.schema";
export const createTag = async (req: Request, res: Response) => {
  const { user } = req;
  console.log("user: ", user);

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
};

export const listTags = async (req: Request, res: Response) => {
  const { user } = req;

  const list = await TagModel.find({ userId: user });
  res.status(200).send(list);
};

export const updateTag = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, status, deadlines }: ITag = req.body;
    const {user} = req;
  const doesExist = await TagModel.findOne({ _id: id },{userId : user});
  if (!doesExist) return "This tag doesn't exist in our db !";

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
};
export const updateStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {user} = req;
  const { status }: ITag = req.body;
  const doesExist = await TagModel.findOne({ _id: id });
  if (!doesExist) return "This tag doesn't exist in our db !";

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
};
export const deleteTag = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {user} = req;
  const doesExist = await TagModel.findOne({ _id: id });
  if (!doesExist) "This product does not exist";
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
};
