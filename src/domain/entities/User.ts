export type UserProps = {
  id: number | null
  name: string
  course_id: number
  semester: number
}

export class User {

  private constructor(private props: UserProps) {}

  // getters
  get id() { return this.props.id }
  get name() { return this.props.name }
  get course_id() { return this.props.course_id }
  get semester() { return this.props.semester }

  static create(props: Omit<UserProps, "id">): User {

    const user = new User({
      ...props,
      id: null
    })

    user.validate()
    return user
  }

  static restore(props: UserProps): User {
    return new User(props)
  }

  private validate(): void {

    if (typeof this.name !== "string" || this.name.trim().length === 0) {
      throw new Error("Nome invalido")
    }
    if (typeof this.course_id !== "number") {
        throw new Error("Curso inválido");
    }
    if (![1,2,3,4,5,6,7,8,9,10].includes(this.semester)) {
      throw new Error("Adicione um semestre valido (1-10).")
    }
  }
}