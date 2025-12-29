export type AuthProps = {
  id: string;
  username: string;
  email?: string | null;
  passwordHash: string;
  isAdmin: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Auth {
  readonly id: string;
  username: string;
  email?: string | null;
  passwordHash: string;
  isAdmin: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: AuthProps) {
    this.id = props.id;
    this.username = props.username;
    this.email = props.email ?? null;
    this.passwordHash = props.passwordHash;
    this.isAdmin = props.isAdmin;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  toPrimitives() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      passwordHash: this.passwordHash,
      isAdmin: this.isAdmin,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromRow(row: any) {
    if (!row) return null;
    return new Auth({
      id: row.id,
      username: row.username,
      email: row.email,
      passwordHash: row.password_hash,
      isAdmin: Boolean(row.is_admin),
      createdAt: row.created_at ? new Date(row.created_at) : undefined,
      updatedAt: row.updated_at ? new Date(row.updated_at) : undefined,
    });
  }
}
