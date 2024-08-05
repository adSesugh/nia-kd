import { CompaignInput } from "@/graphql/__generated__/graphql";
import { RESTDataSource } from "@apollo/datasource-rest";
import { PrismaClient } from "@prisma/client";
import moment from "moment";

class CompaignAPI extends RESTDataSource {
    private _todayDate = new Date(moment().format("Y-MM-D"))
    private _startOfYear = new Date(moment().startOf('year').format("Y-MM-D"))
    private _endOfYear = new Date(moment().endOf('year').format("Y-MM-D"))
    
    async createCompaign(prisma: PrismaClient, input: CompaignInput) {
        return await prisma.compaign.create({
            data: {
                name: input.name,
                duration: input.duration,
                starts_at: new Date(input.starts_at),
                ends_at: new Date(input.ends_at),
                link: input.link,
                web_banner: input.web_banner,
                mobile_banner: input.mobile_banner,
                status: true
            }
        })
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
                link: input.link,
                web_banner: input.web_banner,
                mobile_banner: input.mobile_banner
            }
        })

        return compaign
    }
}

export default CompaignAPI