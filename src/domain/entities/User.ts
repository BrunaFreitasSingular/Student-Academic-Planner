export type UserProps = {
  id: string | null;
  email: string;
  password_hash: string;
  provider: string;
  is_active: boolean;
  created_at: Date;
};

export class User {
  private constructor(private props: UserProps) {}

  get id() {
    return this.props.id;
  }
  get email() {
    return this.props.email;
  }
  get password_hash() {
    return this.props.password_hash;
  }
  get provider() {
    return this.props.provider;
  }
  get is_active() {
    return this.props.is_active;
  }
  get created_at() {
    return this.props.created_at;
  }

  static create(props: Omit<UserProps, "id" | "created_at">): User {
    return new User({ ...props, id: null, created_at: new Date() });
  }

  static restore(props: UserProps): User {
    return new User(props);
  }

  toJSON() {
    return {
      id: this.props.id,
      email: this.props.email,
      provider: this.props.provider,
      is_active: this.props.is_active,
      created_at: this.props.created_at,
    };
  }
}
