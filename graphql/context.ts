import { MicroRequest } from "apollo-server-micro/dist/types";
import { ServerResponse } from "http";
import { PrismaClient } from "@prisma/client";
import prisma from "@lib/prisma";

export interface Context {
  prisma: PrismaClient;
  req: MicroRequest;
  res: ServerResponse;
}

export async function createContext({ req, res }): Promise<Context> {
  return {
    prisma,
    req,
    res,
  };
}
