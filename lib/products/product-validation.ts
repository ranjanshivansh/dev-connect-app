import z from "zod";

export const productSchema=z.object({
    name:z.string()
          .min(3,{message:"Name must be at least 3 characters"})
          .max(120,{message:"Name should be less than 120 characters"}),

    slug:z.string()
          .min(3,{message:"Slug must be at least 3 characters"})
          .max(140,{message:"Slug should be less than 140 characters"})
          .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/,{
            message:"Slug must be lowercase and contain only numbers and letters and hyphen"
          }),
    tagline:z.string()
             .max(200,{message:"Tagline must be less than 200 characters"}),
    description:z.string().optional(),
    technologies:z.string().min(1,"Technologies Required")
                  .transform((val) =>
                  val
                   ?val
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean)
                  : []
  ),
    githubUrl:z.string().min(1,{message:"GitHub URL is required"}),
    websiteUrl:z.string().min(1,{message:"Website URL is required"}),
    tag:z.string()
          .min(1,{message:"Tag is required"})
          .transform((val)=>val.split(",").map((tag)=>tag.trim().toLowerCase())),
})