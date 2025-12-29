export type UserProps = {
  userId?: number;
  userName: string;
  passwordHash: string;
  hashMethod: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class User {
  readonly userId?: number;
  userName: string;
  passwordHash: string;
  hashMethod: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: UserProps) {
    this.userId = props.userId;
    this.userName = props.userName;
    this.passwordHash = props.passwordHash;
    this.hashMethod = props.hashMethod;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  toPrimitives() {
    return {
      userId: this.userId,
      userName: this.userName,
      passwordHash: this.passwordHash,
      hashMethod: this.hashMethod,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromRow(row: any) {
    if (!row) return null;
    return new User({
      userId: row.user_id,
      userName: row.user_name,
      passwordHash: row.password,
      hashMethod: row.hash_method,
      createdAt: row.created_at ? new Date(row.created_at) : undefined,
      updatedAt: row.updated_at ? new Date(row.updated_at) : undefined,
    });
  }
}
