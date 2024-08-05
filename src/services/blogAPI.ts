import { BlogInput } from "@/graphql/__generated__/graphql";
import { RESTDataSource } from "@apollo/datasource-rest";
import { PrismaClient } from "@prisma/client";
import {
    PutObjectCommand,
} from "@aws-sdk/client-s3";
import s3Client from "@/lib/s3Client";


class BlogAPI extends RESTDataSource {
    async createBlog(prisma: PrismaClient, userId: string, input: BlogInput) {
        
        const buffer = Buffer.from(input.featuredImage.split(',')[1], 'base64');

        const url: string = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/blogs/${input.title.toLowerCase().replaceAll(' ', '-')}`
        const tagList: any = []
        input.tags?.forEach((tag: any) => {
            const dataFormat = {
                tag: {
                    connectOrCreate: {
                        where: {
                            name: tag
                        },
                        create: {
                            name: tag
                        }
                    }
                }
            }
            tagList.push(dataFormat)
        })

        const blog = await prisma.blog.create({
            data: {
                title: input.title,
                content: input.content,
                summary: input.summary,
                featuredImage: url,
                userId: userId,
                tags: {
                    create: [...tagList]
                }
            }
        })

        const command = new PutObjectCommand({
            Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME as string,
            Key: `blogs/${blog.title.toLowerCase().replaceAll(' ', '-')}`,
            Body: buffer,
            ContentEncoding: 'base64',
            ContentType: 'image/jpeg'
        });

        const { $metadata: res } = await s3Client.send(command);

        if (res.httpStatusCode === 200) {
            return {
                code: res.httpStatusCode,
                success: true,
                message: "Blog created",
                blog
            }
        }

        return {
            code: 400,
            success: false,
            message: "Error occurred",
            blog: null
        }
    }

    async getBlogs(prisma: PrismaClient, status: any) {

        if (status) {
            const blogs = await prisma.blog.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                where: {
                    OR: [
                        {
                            status: {
                                equals: status
                            }
                        }
                    ]
                }
            })

            return blogs
        }

        const blogs = await prisma.blog.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        return blogs
    }

    async publishedBlog(prisma: PrismaClient, blogId: string, status: string) {
        const blog = await prisma.blog.update({
            where: {
                id: blogId
            },
            data: {
                status
            }
        })

        if (blog) {
            return {
                code: 200,
                success: true,
                message: `Blog ${status}`,
                blog
            }
        }

        return {
            code: 400,
            success: false,
            message: `Blog ${status} failed`,
            blog
        }
    }

    async getBlog(prisma: PrismaClient, blogId: string) {
        const blog = await prisma.blog.findFirst({
            where: {
                id: blogId
            },
            include: { tags: { include: { tag: true } }, user: { include: { member: true } } }
        })

        return blog
    }
}

export default BlogAPI