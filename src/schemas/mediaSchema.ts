import { z } from "zod";

export const mediaSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum(["Movie", "TV Show"], {
    message: 'Type must be "Movie" or "TV Show"',
  }),
  director: z.string().min(1, "Director is required"),
  budget: z.string().min(1, "Budget is required"), // REQUIRED field
  location: z.string().min(1, "Location is required"),
  duration: z.string().min(1, "Duration is required"),
  yearTime: z.string().min(1, "Year/Time is required"),
  imageUrl: z.url("Invalid URL format for image").optional().nullable(),
});

export const updateMediaSchema = mediaSchema.partial();

export const paginationSchema = z.object({
  page: z
    .string()
    .default("1")
    .transform(Number)
    .pipe(z.number().min(1, "Page must be at least 1")),
  limit: z
    .string()
    .default("10")
    .transform(Number)
    .pipe(z.number().min(1, "Limit must be at least 1")),
});
