import { CompaignInput } from "@/graphql/__generated__/graphql";
import { s3FileUpload } from "@/lib/s3Client";
import { RESTDataSource } from "@apollo/datasource-rest";
import { PrismaClient } from "@prisma/client";
import moment from "moment";

class CompaignAPI extends RESTDataSource {
    private _todayDate = new Date(moment().format("Y-MM-D"))
    private _startOfYear = new Date(moment().startOf('year').format("Y-MM-D"))
    private _endOfYear = new Date(moment().endOf('year').format("Y-MM-D"))
    
    async createCompaign(prisma: PrismaClient, input: CompaignInput) {
        const bufferWeb = input.web_banner ? Buffer.from(input.web_banner.split(',')[1], 'base64') : '';
        const bufferMobile = input.mobile_banner ? Buffer.from(input.mobile_banner.split(',')[1], 'base64') : '';

        const compaign = await prisma.compaign.create({
            data: {
                name: input.name,
                duration: input.duration,
                starts_at: input.starts_at,
                ends_at: input.ends_at,
                start_time: input.start_time,
                link: input.link
            }
        })

        if (input.web_banner){
            const url: string = bufferWeb ? `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/ads/web/${compaign.id}/${input.name.toLowerCase().replaceAll(' ', '-')}-web` : ''

            const res =  await s3FileUpload(`ads/web/${compaign.id}/${input.name.toLowerCase().replaceAll(' ', '-')}`, 'image/png', bufferWeb)
            if(res.httpStatusCode === 200){
                await prisma.compaign.update({
                    where: {
                        id: compaign.id
                    },
                    data: {
                        web_banner: url
                    }
                })
            }
        }

        if (input.mobile_banner){
            const url: string = bufferMobile ? `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/ads/mobile/${compaign.id}/${input.name.toLowerCase().replaceAll(' ', '-')}-mobile` : ''

            const res =  await s3FileUpload(`ads/mobile/${compaign.id}/${compaign.name.toLowerCase().replaceAll(' ', '-')}`, 'image/png', bufferMobile)
            if(res.httpStatusCode === 200){
                await prisma.compaign.update({
                    where: {
                        id: compaign.id
                    },
                    data: {
                        mobile_banner: url
                    }
                })
            }
        }

        return compaign
    }

    async getCompaigns(prisma: PrismaClient) {
        const compaigns = await prisma.compaign.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                deletedAt: null
            }
        })
        return compaigns
    }

    async getCompaign(prisma: PrismaClient, compaignId: string) {
        const compaign = await prisma.compaign.findFirst({
            where: {
                id: compaignId
            }
        })

        return compaign
    }
    
    async deleteCompaign(prisma: PrismaClient, compaignId: string) {
        const compaign = await prisma.compaign.update({
            where: {
                id: compaignId
            },
            data: {
                deletedAt: new Date()
            }
        })

        return compaign
    }

    async stopCompaign(prisma: PrismaClient, compaignId: string, status: boolean) {
        const compaign = await prisma.compaign.update({
            where: {
                id: compaignId,
            },
            data: {
                status: !status
            }
        })

        return compaign
    }

    async updateCompaign(prisma: PrismaClient, compaignId: string, input: CompaignInput){
        const compaign = await prisma.compaign.update({
            where: {
                id: compaignId,
            },
            data: {
                name: input.name,
                duration: input.duration,
                starts_at: new Date(input.starts_at),
                ends_at: new Date(input.ends_at),
                start_time: new Date(input.start_time),
                link: input.link,
                web_banner: input.web_banner,
                mobile_banner: input.mobile_banner
            }
        })

        return compaign
    }
}

export default CompaignAPI