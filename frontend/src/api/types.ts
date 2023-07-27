import z from "zod";

export const epochSchema = z.object({
  epoch: z.number(),
});

export type Epoch = z.infer<typeof epochSchema>;
