import { s3FileUploadPdf } from "@/lib/s3Client";
import { RESTDataSource } from "@apollo/datasource-rest";
import { PrismaClient } from "@prisma/client";
import { ResourceResponse, ResourcesInput } from "@/graphql/__generated__/graphql";

class ResourceAPI extends RESTDataSource {
    async getResources(prisma: PrismaClient) {
        const resources = await prisma.resource.findMany({
            where: {
                deletedAt: null
            }
        })

        return resources
    }

    async getResource(prisma: PrismaClient, resourceId: string) {
        const resource = await prisma.resource.findFirst({
            where: {
                id: resourceId,
                deletedAt: null
            }
        })

        return resource
    }

    async deleteResource(prisma: PrismaClient, resourceId: string) {
        const resource = await prisma.resource.update({
            where: {
                id: resourceId,
                deletedAt: null
            },
            data: {
                deletedAt: new Date()
            }
        })

        if (resource) return true

        return false
    }

    async createResources(prisma: PrismaClient, input: ResourcesInput, userId: string) {
       
        const buffer = input.resourcePath ? Buffer.from(input.resourcePath.split(',')[1], 'base64') : '';

        const url: string = buffer ? `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/resources/${input.name.replaceAll(' ', '-')}` : ''
        const response =  await s3FileUploadPdf(`resources/${input.name.replaceAll(' ', '-')}`, buffer)
        
        if(response.httpStatusCode === 200){
            const res = await prisma.resource.create({
                data: {
                    name: input.name, 
                    resourcePath: url, 
                    fileType: input.fileType.toUpperCase(), 
                    fileSize: Number(input.fileSize),
                    userId: userId
                }
            })

            const response: ResourceResponse = {
                code: 201,
                success: true,
                message: 'Resource created',
            }

            return response
        } else {
            const response: ResourceResponse = {
                code: 400,
                success: false,
                message: 'No effect occured',
            }

            return response
        }
    }
}

export default ResourceAPI