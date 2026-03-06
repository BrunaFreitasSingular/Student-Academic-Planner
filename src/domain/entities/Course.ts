export type CourseProps = {
  id: number | null
  name: string
  requiredCredits: number
  transferredCredits: number
  electiveCredits: number
  complementaryCredits: number
  numberOfComplementaryTypes: number
  extensionHours: number
}

export class Course {

  private constructor(private props: CourseProps) {}

  // getters
  get id() { return this.props.id }
  get name() { return this.props.name }
  get requiredCredits() { return this.props.requiredCredits }
  get transferredCredits() { return this.props.transferredCredits }
  get electiveCredits() { return this.props.electiveCredits }
  get complementaryCredits() { return this.props.complementaryCredits }
  get numberOfComplementaryTypes() { return this.props.numberOfComplementaryTypes }
  get extensionHours() { return this.props.extensionHours }

  static create(props: Omit<CourseProps, "id">): Course {
    return new Course({
      ...props,
      id: null
    })
  }

  static restore(props: CourseProps): Course {
    return new Course(props)
  }
}