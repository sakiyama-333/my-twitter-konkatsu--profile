import { z, ZodError } from "zod";
import { NextFunction, Response, Request } from "express";

export const validateRequestBodyByScheme = (scheme: z.ZodObject<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      scheme.parse(req.body);
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(`💜💜💜💜${req.body.gender}`);
        console.log(typeof req.body.gender);
        return next(new Error(`${error.name}: ${error.message}`));
      }
    }
  };
};
