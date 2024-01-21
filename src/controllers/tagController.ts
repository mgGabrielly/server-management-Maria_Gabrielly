import { Request, Response } from 'express';
import { Tag } from '../models/tag.model';
import { PrismaClient } from '@prisma/client';
import { checkTagExist } from '../components/checkTagExist';

const prisma = new PrismaClient();

export class TagController {
    private tagModel: Tag;

    constructor() {
        this.tagModel = new Tag();
    }

    async createTag(req: Request, res: Response): Promise<void> {
        try {
            const { name } = req.body;

            const tagExist = await checkTagExist( name );
            if (tagExist) {
                res.status(405).json( "A tag já é cadastrada." );
                return;
            } 

            const tagData = { name };
            const tag = await this.tagModel.createTag(tagData);
            res.status(201).json(tag);
        } catch (error) {
            res.status(500).json({ error: `Erro ao criar: ${error}` });
        }
    }

    async updateTag(req: Request, res: Response): Promise<void> {
        try {
            const { name } = req.body;
            const tagId = req.params.id;

            const tagExist = await this.tagModel.listTag(tagId);
            if (!tagExist) {
                res.status(404).json( "A tag não foi encontrada." );
                return;
            } 

            const tagData = { name };
            const tag = await this.tagModel.updateTag(tagData, tagId);
            res.status(200).json(tag);
        } catch (error) {
            res.status(500).json({ error: `Erro ao atualizar: ${error}` });
        }
    }

    async getAllTags(req: Request, res: Response): Promise<void> {
        try {
            const tags = await this.tagModel.listAllTags();
            res.status(200).json(tags);
        } catch (error) {
            res.status(500).json({ error: `Erro ao listar: ${error}` });
        }
    }

    async getTag(req: Request, res: Response): Promise<void> {
        try {
            const tagId = req.params.id;
            const tag = await this.tagModel.listTag(tagId);
            res.status(200).json(tag);
        } catch (error) {
            res.status(500).json({ error: `Erro ao listar: ${error}` });
        }
    }

    async deleteTag(req: Request, res: Response): Promise<void> {
        try {
            const tagId = req.params.id;
            await this.tagModel.deleteTag(tagId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: `Erro ao deletar: ${error}` });
        }
    }

}