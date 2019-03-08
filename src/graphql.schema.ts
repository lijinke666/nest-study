export class CreateUserInput {
  nickname: string;
  phone: number;
}

export class User {
  id: string;
  nickname: string;
  phone: string;
}

export abstract class IMutation {
  abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;
}

export abstract class IQuery {
  abstract getUsers(): User[] | Promise<User[]>;

  abstract user(id: string): User | Promise<User>;

  abstract temp__(): boolean | Promise<boolean>;
}

export abstract class ISubscription {
  abstract userCreated(): User | Promise<User>;
}
