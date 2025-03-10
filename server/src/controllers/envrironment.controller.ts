import { Request, Response } from "express";
import { createEnvironment, getEnvironment, getEnvironments, updateEnvironment } from "../services/environment.services";
import { DatabaseError, ResourceNotFoundError, ValidationError } from "../utils/errors";
import { prisma } from "../database";

export const getEnvironmentController = async (req: Request, res: Response) => {
    const userId = req.userId;
    const { environmentId } = req.params;

    try {

        const checkUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
         if (!checkUser) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const environment = await getEnvironment(environmentId);
        if (!environment) {
            throw new ResourceNotFoundError('Environment', environmentId);
        }

        res.status(200).json(environment);
    } catch (error) {
        if (error instanceof DatabaseError || error instanceof ResourceNotFoundError) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

export const getEnvironmentsController = async (req: Request, res: Response) => {
    const userId = req.userId;
    const { productId } = req.params;

    try {
        const environments = await getEnvironments(productId);
        if (!environments) {
            throw new ResourceNotFoundError('ProductId', productId);
        }
        res.status(200).json(environments);
    } catch (error) {
        if (error instanceof DatabaseError || error instanceof ResourceNotFoundError) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

export const createEnvironmentController = async (req: Request, res: Response) => {
    const { productId } = req.params;
    const environmentInput = req.body;

    try {
        const environment = await createEnvironment(productId, {...environmentInput});
        res.status(201).json(environment);
    } catch (error) {
        if (error instanceof DatabaseError || error instanceof ValidationError) {
            res.status(400).json({ error: error.message})
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

export const updateEnvironmentController = async (req: Request, res: Response) =>  {
    const { environmentId } = req.params;
    const data = req.body;

    try {
        const environment = await getEnvironment(environmentId);
        if (!environment) {
            throw new ResourceNotFoundError('Environment', environmentId);
        }

        const updatedEnvironment = await updateEnvironment(environmentId, data);
        res.status(200).json(updateEnvironment);
    } catch (error) {
        if (error instanceof DatabaseError || error instanceof ResourceNotFoundError) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
