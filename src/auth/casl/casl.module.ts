import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslAbilityFactory } from '@/auth/casl/casl-ability.factory';
import { PermissionsGuard } from '@/auth/guard/permission.guard';
import { AuthService } from '@/auth/auth.service';
import { AuthRole } from '@/auth/casl/entities/auth-role.entity';
import { AuthPermission } from '@/auth/casl/entities/auth-permission.entity';
import { AuthObject } from '@/auth/casl/entities/auth-object.entity';
import { UserModule } from '@/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([AuthRole, AuthObject, AuthPermission]),
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.getOrThrow('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: '1h',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [CaslAbilityFactory, PermissionsGuard, AuthService, ConfigService],
  exports: [CaslAbilityFactory, PermissionsGuard],
})
export class CaslModule {}
