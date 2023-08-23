import { PrismaService } from './prisma.service';
describe('PrismaService', () => {
  let prismaService: PrismaService;

  beforeEach(() => {
    prismaService = new PrismaService();
  });

  it('should be defined', () => {
    expect(prismaService).toBeDefined();
  });
});
