import { s3FileUploadPdf } from "@/lib/s3Client";
import { RESTDataSource } from "@apollo/datasource-rest";
import { PrismaClient } from "@prisma/client";
import { ResourceResponse, ResourcesInput } from "@/graphql/__generated__/graphql";

class ResourceAPI extends RESTDataSource {
    async getResources(prisma: PrismaClient) {
        const resources = await prisma.resource.findMany({})

        return resources
    }

    async getResource(prisma: PrismaClient, resourceId: string) {
        const resource = await prisma.resource.findFirst({
            where: {
                id: resourceId
            }
        })

        return resource
    }

    async createResources(prisma: PrismaClient, input: any, userId: string) {
        const fileUploads: Record<string, any>[] = []
        if(input && input?.length > 0){
            input.forEach(async (resource: { resourcePath: string; name: string; }) => {
                const buffer = resource.resourcePath ? Buffer.from(resource.resourcePath.split(',')[1], 'base64') : '';
                const url: string = buffer ? `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/resources/${resource.name.replaceAll(' ', '-')}.pdf` : ''
                const response =  await s3FileUploadPdf(`resources/${resource.name.replaceAll(' ', '-')}.pdf`, buffer)
                if(response.httpStatusCode === 200){
                    fileUploads.push({name: resource.name, resourcePath: url, userId: userId})
                }
            })
        }

        const resources = await prisma.resource.createMany({
            data: [...fileUploads as any]
        })

        const response: ResourceResponse = {
            code: 201,
            success: true,
            message: 'Resource created'
        }

        if(resources.count > 0) {
            const res = {...response, resources: resources as any}
            return res
        }

        const resnull = {...response, resources: null}

        return resnull
    }
}

export default ResourceAPI