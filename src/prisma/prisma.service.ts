import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaService {}

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
