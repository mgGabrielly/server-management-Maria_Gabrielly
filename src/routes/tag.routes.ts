import express from 'express';
import { TagController } from '../controllers/tagController';

const tagRouter = express.Router();
const tagController = new TagController();

tagRouter.post('/create-tag', tagController.createTag.bind(tagController));
tagRouter.get('/tags', tagController.getAllTags.bind(tagController));
tagRouter.put('/update-tag/:id', tagController.updateTag.bind(tagController));
tagRouter.get('/tag/:id', tagController.getTag.bind(tagController));
tagRouter.delete('/delete-tag/:id', tagController.deleteTag.bind(tagController));

export default tagRouter;