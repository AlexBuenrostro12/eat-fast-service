import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { FindOptionsSelect, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddressService } from 'src/address/address.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserEmailDto } from './dto/update-user-email.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly addressService: AddressService,
  ) {}

  findAll() {
    return this.userRepository.find({
      select: [
        'id',
        'firstname',
        'lastname',
        'email',
        'phone',
        'createdAt',
        'updatedAt',
        'deletedAt',
        'address',
        'role',
        'refreshToken',
        'forgotPasswordToken',
      ],
    });
  }

  async findOneById(id: number, selectKey?: FindOptionsSelect<User>) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['address'],
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        phone: true,
        role: true,
        refreshToken: true,
        forgotPasswordToken: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        address: {
          street: true,
          number: true,
          cologne: true,
        },
        ...selectKey,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with #${id} not found`);
    }

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      select: { id: true, email: true, password: true, role: true },
    });

    if (!user) {
      throw new NotFoundException(`User with email: ${email} not exist`);
    }

    return user;
  }

  async create({ address, email, password, ...payload }: CreateUserDto) {
    await this.validateEmail(email);
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAddress = await this.addressService.create(address);

    const user = this.userRepository.create({ ...payload });
    user.email = email;
    user.password = hashedPassword;
    user.address = newAddress;

    const createdUser = await this.userRepository.save(user);

    delete createdUser.password;

    return createdUser;
  }

  async update(
    id: number,
    {
      firstname,
      lastname,
      phone,
      address,
      refreshToken,
      forgotPasswordToken,
    }: UpdateUserDto,
  ) {
    const user = await this.findOneById(id);

    if (user) {
      if (firstname) user.firstname = firstname;
      if (lastname) user.lastname = lastname;
      if (phone) user.phone = phone;
      if (address) {
        if (address.street) {
          user.address.street = address.street;
        }
        if (address.number) {
          user.address.number = address.number;
        }
        if (address.cologne) {
          user.address.cologne = address.cologne;
        }
      }
      if (refreshToken) user.refreshToken = refreshToken;
      if (forgotPasswordToken) user.forgotPasswordToken = forgotPasswordToken;
    }

    return this.userRepository.save(user);
  }

  async updateEmail(id: number, { oldEmail, newEmail }: UpdateUserEmailDto) {
    await this.validateEmail(newEmail);
    const user = await this.findOneByIdAndEmail(id, oldEmail);

    if (user) {
      user.email = newEmail;
    }

    return this.userRepository.save(user);
  }

  async updatePassword(
    id: number,
    { currentPassword, newPassword }: UpdateUserPasswordDto,
  ) {
    const user = await this.findOneById(id, { password: true });

    if (user) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);

      if (!isMatch) {
        throw new BadRequestException(
          `User password: ${currentPassword} not match`,
        );
      }

      const hashedPassword = await this.hassPassword(newPassword);

      user.password = hashedPassword;

      await this.userRepository.save(user);

      delete user.password;

      return user;
    }
  }

  async delete(id: number) {
    return await this.userRepository.softDelete(id);
  }

  private async validateEmail(email: string) {
    const exist = await this.userRepository.findOne({ where: { email } });

    if (exist) {
      throw new BadRequestException(`Email: ${email} already exists`);
    }
  }

  private async findOneByIdAndEmail(id: number, email: string) {
    const user = await this.userRepository.findOne({ where: { id, email } });

    if (!user) {
      throw new NotFoundException(`User with email: ${email} not exist`);
    }

    return user;
  }

  private async hassPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
}
