import * as z from "zod";
export const QuestionType = z.object({
  Title: z
    .string()
    .min(5, { message: "Title must be greater than 5 characters." })
    .max(60, { message: "Title must be smaller than 60 characters." }),
  Description: z
    .string()
    .min(5, { message: "Description must be greater than 5 characters." }),
  Tags: z
    .array(z.string().min(3, { message: "Tags are required" }))
    .min(1, { message: "minimum 1 tag is required" })
    .max(3, { message: "maximum 3 tags are allowed" }),
});

export const AnswerSchema = z.object({
  answer: z
    .string()
    .min(50, { message: "Answer must be greater than 50 characters." }),
});
