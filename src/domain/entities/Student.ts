export type StudentProps = {
  id:        number | null
  user_id:   string
  name:      string
  course_id: number
  semester:  number
}

export class Student {
  private constructor(private props: StudentProps) {}

  get id()        { return this.props.id }
  get user_id()   { return this.props.user_id }
  get name()      { return this.props.name }
  get course_id() { return this.props.course_id }
  get semester()  { return this.props.semester }

  static create(props: Omit<StudentProps, 'id'>): Student {
    const student = new Student({ ...props, id: null })
    student.validate()
    return student
  }

  static restore(props: StudentProps): Student {
    return new Student(props)
  }

  toJSON() {
    return {
      id:        this.props.id,
      name:      this.props.name,
      user_id:   this.props.user_id,
      course_id: this.props.course_id,
      semester:  this.props.semester,
    }
  }

  private validate(): void {
    if (typeof this.name !== 'string' || this.name.trim().length === 0) {
      throw new Error('Nome inválido')
    }
    if (typeof this.course_id !== 'number') {
      throw new Error('Curso inválido')
    }
    if (![1,2,3,4,5,6,7,8,9,10].includes(this.semester)) {
      throw new Error('Semestre inválido (1-10)')
    }
  }
}