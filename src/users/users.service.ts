import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { faker } from '@faker-js/faker';

@Injectable()
export class UsersService {
  private generateFakeUsers(limit: number): User[] {
    return Array.from({ length: limit }, () => ({
      userId: faker.string.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate().toDateString(),
    }));
  }

  getAllUsers(
    limit: number,
    offset: number,
    search: string,
    totalNumberOfUser: number,
  ): {
    data: User[];
    limit: number;
    offset: number;
    totalNumberOfUser: number;
    filteredUser: number;
  } {
    const users = this.generateFakeUsers(totalNumberOfUser);

    const filteredUsers = users.filter(
      (user) =>
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()),
    );

    const paginatedUsers = filteredUsers.slice(offset, offset + limit);

    return {
      data: paginatedUsers,
      limit,
      offset,
      totalNumberOfUser,
      filteredUser: filteredUsers.length,
    };
  }

  getProfile(): User {
    const users = this.generateFakeUsers(1);

    return users[0];
  }
}
