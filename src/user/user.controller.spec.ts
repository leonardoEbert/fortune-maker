import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '@/user/user.service';

describe('UserController', () => {
  let controller: UserController;

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
    const dto = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@test.com',
      password: 'testUser',
    };
    expect(controller.create(dto)).toEqual({
      id: expect.any(String),
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
    });

    expect(mockUserService.create).toHaveBeenCalled();
    expect(mockUserService.create).toHaveBeenCalledWith(dto);
  });

  it('should update a user', () => {
    const dto = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@test.com',
      password: 'testUser',
    };

    expect(controller.update('uuidv4', dto)).toEqual({
      id: expect.any(String),
      ...dto,
    });

    expect(mockUserService.update).toHaveBeenCalled();
    expect(mockUserService.update).toHaveBeenCalledWith('uuidv4', dto);
  });
});
