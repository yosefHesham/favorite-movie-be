import { Request, Response, NextFunction } from "express";
import { mediaService } from "../services/mediaService";
import {
  mediaSchema,
  updateMediaSchema,
  paginationSchema,
} from "../schemas/mediaSchema";
import { ZodError } from "zod";

export const mediaController = {
  async createMedia(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = mediaSchema.parse(req.body);
      const newMedia = await mediaService.createMedia(validatedData);
      res.status(201).json(newMedia);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        console.error("Zod Validation Error:", JSON.stringify(error, null, 2));

        // Formatting the error to show more details about which field has the error.
        const formattedErrors = error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
          code: issue.code,
        }));

        return res.status(400).json({ errors: formattedErrors });
      }
      next(error);
    }
  },

  async getAllMedia(req: Request, res: Response, next: NextFunction) {
    try {
      // Validate pagination query parameters
      const { page, limit } = paginationSchema.parse(req.query);
      const { media, total } = await mediaService.getAllMedia(page, limit);
      res.status(200).json({
        data: media,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          errors: error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
            code: issue.code,
          })),
        });
      }
      next(error);
    }
  },

  async updateMedia(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid media ID" });
      }
      const validatedData = updateMediaSchema.parse(req.body);

      const updatedMedia = await mediaService.updateMedia(id, validatedData);
      if (!updatedMedia) {
        return res.status(404).json({ message: "Media not found" });
      }
      res.status(200).json(updatedMedia);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        console.error(
          "Zod Validation Error (Update):",
          JSON.stringify(error, null, 2)
        );

        const formattedErrors = error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
          code: issue.code,
        }));

        return res.status(400).json({ errors: formattedErrors });
      }
      next(error);
    }
  },

  async deleteMedia(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid media ID" });
      }
      const deletedMedia = await mediaService.deleteMedia(id);
      if (!deletedMedia) {
        return res.status(404).json({ message: "Media not found" });
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};
