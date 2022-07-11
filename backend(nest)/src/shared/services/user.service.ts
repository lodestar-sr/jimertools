import { Injectable } from "@nestjs/common";
import { UserDto } from "@shared/dto/user.dto";
import { ChatroomDto } from "@shared/dto/chatroom.dto";
import { generateUuid } from "@shared/helpers/common.helper";
import { StorageService } from "@shared/services/storage.service";

@Injectable()
export class UserService {

  constructor(
    private storageService: StorageService,
  ) {
  }

  find(id: string) {
    return this.storageService.getUsers()
      .find((item) => item.id === id);
  };

  findByName(name: string) {
    return this.storageService.getUsers()
      .find((item) => item.name === name);
  };

  create(name: string, chatroom: ChatroomDto) {
    const user: UserDto = {
      id: generateUuid(),
      name,
      chatroom,
    };
    this.storageService.addUser(user);
    return user;
  }

  update(user: UserDto, updates: Partial<UserDto>) {
    return this.storageService.updateUser(user, updates);
  }

  delete(user: UserDto) {
    this.storageService.deleteUser(user);
  }
}
