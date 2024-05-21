import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@/user/user.entity';
import { BadRequestException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;

  const userMock = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@test.com',
    password: 'testUser',
  };
  const databaseUserMock = {
    id: '1234',
    ...userMock,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  }

  const mockUserRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((user) => Promise.resolve({ id: 'uuidv4', ...user })),
    findOne: jest
      .fn()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .mockImplementation((_email) =>
        Promise.resolve({ id: 'uuidv4', ...databaseUserMock }),
      ),
    find: jest
      .fn()
      .mockImplementation(() => Promise.resolve([new User(databaseUserMock), new User(databaseUserMock)])),
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

  it('should try to create a new user and return a exception', async () => {
    const dto = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@test.com',
      isActive: true,
    };

    jest
      .spyOn(service, 'findOne')
      .mockImplementation(() => Promise.resolve(databaseUserMock));

    try {
      expect(await service.create({ ...dto, password: 'testUser' })).toEqual({
        id: expect.any(String),
        ...dto,
      });
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
      expect(e.message).toBe('User already exists');
    }

    expect.assertions(2);
  });

  it('should search user by key',  async() => {
    const userFound = await service.findOne('test@test.com');

    expect(userFound).toEqual(databaseUserMock);
    expect(mockUserRepository.findOne).toHaveBeenCalled();
  });

  it('should sign up an user successfully', async () => {
    const dto = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@test.com',
      isActive: true,
      password: '1234'
    };

    jest
      .spyOn(service, 'findOne')
      .mockImplementation(() => Promise.resolve(undefined));

    await service.signUp(dto)

    expect(mockUserRepository.save).toHaveBeenCalled();
  });

  it('should not sign up an user and should throw error', async () => {
    const dto = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@test.com',
      isActive: true,
      password: '1234'
    };

    jest
      .spyOn(service, 'findOne')
      .mockImplementation(() => Promise.resolve(databaseUserMock));

    try {
      await service.signUp(dto)
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
      expect(e.message).toBe('User already exists');
    }

    expect.assertions(2);
  });

  it('should query all users and return a list', async() => {
    const userList = await service.findAll();

    expect(userList).toBeInstanceOf(Array);
    expect(userList[0]).toBeInstanceOf(User);
    expect(userList[0]).toEqual(new User(databaseUserMock));
  });
});
