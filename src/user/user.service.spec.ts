import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@/user/user.entity';

describe('UserService', () => {
  let service: UserService;

  const userMock = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@test.com',
    password: 'testUser',
  };

  const mockUserRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((user) => Promise.resolve({ id: 'uuidv4', ...user })),
    findOne: jest
      .fn()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .mockImplementation((_email) =>
        Promise.resolve({ id: 'uuidv4', userMock }),
      ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user and return the created user', async () => {
    const dto = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@test.com',
      isActive: true,
    };

    jest
      .spyOn(service, 'findOne')
      .mockImplementation(() => Promise.resolve(undefined));

    expect(await service.create({ ...dto, password: 'testUser' })).toEqual({
      id: expect.any(String),
      ...dto,
    });
  });
});
