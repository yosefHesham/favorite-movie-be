import prisma from "../config/database";
import { mediaSchema, updateMediaSchema } from "../schemas/mediaSchema";
import { z } from "zod";

export type MediaCreateInput = z.infer<typeof mediaSchema>;
export type MediaUpdateInput = z.infer<typeof updateMediaSchema>;

export const mediaService = {
  async createMedia(data: MediaCreateInput) {
    return prisma.media.create({ data });
  },

  async getAllMedia(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [media, total] = await prisma.$transaction([
      prisma.media.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.media.count(),
    ]);
    return { media, total };
  },

  async updateMedia(id: number, data: MediaUpdateInput) {
    return prisma.media.update({
      where: { id },
      data,
    });
  },

  async deleteMedia(id: number) {
    return prisma.media.delete({ where: { id } });
  },
};
