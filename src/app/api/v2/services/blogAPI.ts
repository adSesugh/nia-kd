import { AugmentedRequest, RESTDataSource } from "@apollo/datasource-rest";
import { KeyValueCache } from "@apollo/utils.keyvaluecache";
import { PrismaClient } from "@prisma/client";

class BlogAPI extends RESTDataSource {
    // private token: string;

    // constructor(options: { token: string; cache: KeyValueCache }) {
    //     super(options);
    //     this.token = options.token;
    // }

    // override willSendRequest(path: string, request: AugmentedRequest) {
    //     request.headers.authorization = this.token;
    // }

    async getBlogs(prisma: PrismaClient) {
        const blogs = await prisma.blog.findMany({
            include: {
                tags: true
            }
        })
        return blogs
    }

    async getBlog(prisma: PrismaClient, id: string) {
        const blog = await prisma.blog.findFirst({
            where: {
                id: id
            },
            include: {
                tags: true
            }
        })
        return blog
    }

    async createBlog(prisma: PrismaClient, input: any) {
        const tagList: { where: { name: string }, create: { name: string } }[] = []
        input.tags?.forEach((el: string) => tagList.push({
            where: {
                name: el
            },
            create: {
                name: el
            }
        }))
        const newBlog = prisma.blog.create({
            data: {
                title: input.title,
                content: input.content,
                link: input.link,
                summary: input.summary,
                image: input.image,
                tags: {
                    connectOrCreate: tagList
                }
            },
            include: {
                tags: true
            }
        })
        if (newBlog) {
            return {
                code: 200,
                success: true,
                message: "Blog created!",
                blog: newBlog
            }
        }
        return {
            code: 400,
            success: false,
            message: "Failed to saved!",
            blog: null
        }
    }
}


export default BlogAPI