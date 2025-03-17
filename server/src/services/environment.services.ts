import { Prisma } from "@prisma/client";
import { environmentCache } from "../cache/environment.cache";
import { cache } from "../config/cache";
import { prisma } from "../database";
import { TEnvironment, TEnvironmentCreateInput, TEnvironmentUpdateInput, ZEnvironment } from "../types/environment";
import { DatabaseError, ResourceNotFoundError, ValidationError } from "../utils/errors";
import { z } from "zod";

export const getEnvironment = (environmentId: string): Promise<TEnvironment | null> =>
    cache(
        async () => {
            try {
                const environment = await prisma.environment.findUnique({
                    where: {
                        id: environmentId,
                    },
                });
                return environment;
            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    console.error(error);
                    throw new DatabaseError(error.message)
                }

                throw error;
            }
        },
        `getEnvironment-${environmentId}`,
        {
            tag: [environmentCache.tag.byId(environmentId)]
        }
    )();

export const getEnvironments = async (productId: string): Promise<TEnvironment[]> => 
    cache(
        async():  Promise<TEnvironment[]> => {
            
            let productPrisma;
            try {
                productPrisma = await prisma.product.findFirst({
                    where: {
                        id: productId,
                    },
                    include: {
                        environments: true,
                    },
                });

                if (!productPrisma) {
                    throw new ResourceNotFoundError("Product", productId);
                }
            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    console.error(error);
                    throw new DatabaseError(error.message)
                }

                throw error;
            }

            const environments: TEnvironment[] = [];
            for (let environment of productPrisma.environments) {
                let targetEnvironment: TEnvironment = ZEnvironment.parse(environment);
                environments.push(targetEnvironment);
            }

            try {
                return environments
            } catch (error) {
                if (error instanceof z.ZodError) {
                    console.error(JSON.stringify(error.errors, null, 2));
                  }
                  throw new ValidationError("Data validation of environments array failed");
            }
        },
        `getEnvironments-${productId}`,
        {
          tag: [environmentCache.tag.byProductId(productId)],
        }
    )();

export const updateEnvironment = async (
    environmentId: string,
    data: Partial<TEnvironmentUpdateInput>
): Promise<TEnvironment> => {
    const newData = { ...data, updatedAt: new Date() };
    let updateEnvironment;
    try {
        updateEnvironment = await prisma.environment.update({
            where: {
                id: environmentId,
            },
            data: newData,
        });

        environmentCache.revalidate({
            id: environmentId,
            productId: updateEnvironment.productId,
        });

        return updateEnvironment;
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            throw new DatabaseError(error.message);
        }
        throw error;
    }
};

// TODO - create the "getFirstEnvironmentByUserId" if neccessary

export const createEnvironment = async (
    productId: string,
    environmentInput: Partial<TEnvironmentCreateInput>
): Promise<TEnvironment> => {
    try {
        const environment = await prisma.environment.create({
            data: {
                type: environmentInput.type || "development",
                product: { connect: { id: productId } },
            },
        });

        environmentCache.revalidate({
            id: environment.id,
            productId: environment.productId,
        });

        return environment;
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            throw new DatabaseError(error.message);
        }
        throw error;
    }
};



