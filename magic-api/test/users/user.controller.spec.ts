import { describe } from '@jest/globals';
import { UserService } from 'src/users/user.service';
import { UserModule } from '@/users/user.module';
import { Test, TestingModule } from '@nestjs/testing';

describe('testando a controller de usuário', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    userService = module.get<UserService>(UserService);
  });
  it('o login deve gerar um token válido', async () => {
    const usuarioMock = {
      username: 'admin',
      email: 'admin@gmail.com',
      password: 'renan12344',
    };
    const token = await userService.login(usuarioMock);
    expect(token).toBe(token);
  });
});
