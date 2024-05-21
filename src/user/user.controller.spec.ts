import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '@/user/user.service';

describe('UserController', () => {
  let controller: UserController;

  const userDtoMock = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@test.com',
    password: 'testUser',
  };

  const mockUserService = {
    create: jest.fn((dto) => {
      const createdUser = {
        id: 'uuidv4',
        ...dto,
      };

      delete createdUser.password;

      return createdUser;
    }),
    update: jest.fn().mockImplementation((id, dto) => ({
      id,
      ...dto,
    })),
    remove: jest.fn().mockImplementation((id) => ({
      id,
      ...userDtoMock,
    })),
    findAll: jest.fn().mockImplementation(() => [userDtoMock]),
    findOneById: jest.fn().mockImplementation((id) => ({ id, ...userDtoMock })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    expect(controller.create(userDtoMock)).toEqual({
      id: expect.any(String),
      firstName: userDtoMock.firstName,
      lastName: userDtoMock.lastName,
      email: userDtoMock.email,
    });

    expect(mockUserService.create).toHaveBeenCalled();
    expect(mockUserService.create).toHaveBeenCalledWith(userDtoMock);
  });

  it('should update a user', () => {
    expect(controller.update('uuidv4', userDtoMock)).toEqual({
      id: expect.any(String),
      ...userDtoMock,
    });

    expect(mockUserService.update).toHaveBeenCalled();
    expect(mockUserService.update).toHaveBeenCalledWith('uuidv4', userDtoMock);
  });

  it('should delete a user', () => {
    expect(controller.remove('uuidv4')).toEqual({
      id: expect.any(String),
      ...userDtoMock,
    });

    expect(mockUserService.remove).toHaveBeenCalled();
    expect(mockUserService.remove).toHaveBeenCalledWith('uuidv4');
  });

  it('should get a list of all users', () => {
    expect(controller.findAll()).toBeInstanceOf(Array);
    expect(mockUserService.findAll).toHaveBeenCalled();
  });

  it('should get an user by id', () => {
    expect(controller.findOne('uuidv4')).toEqual({
      id: expect.any(String),
      ...userDtoMock,
    });

    expect(mockUserService.findOneById).toHaveBeenCalled();
    expect(mockUserService.findOneById).toHaveBeenCalledWith('uuidv4');
  });
});
