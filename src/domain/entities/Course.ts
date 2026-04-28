export type CourseProps = {
  id: number | null;
  name: string;
  requiredCredits: number;
  electiveCredits: number;
  complementaryCredits: number;
};

export class Course {
  private constructor(private props: CourseProps) {}

  get id() {
    return this.props.id;
  }
  get name() {
    return this.props.name;
  }
  get requiredCredits() {
    return this.props.requiredCredits;
  }
  get electiveCredits() {
    return this.props.electiveCredits;
  }
  get complementaryCredits() {
    return this.props.complementaryCredits;
  }

  static create(props: Omit<CourseProps, "id">): Course {
    const course = new Course({
      ...props,
      id: null,
    });
    this.validate(course);
    return course;
  }

  static restore(props: CourseProps): Course {
    return new Course(props);
  }

  toJSON() {
    return {
      id: this.props.id,
      name: this.props.name,
      requiredCredits: this.props.requiredCredits,
      electiveCredits: this.props.electiveCredits,
      complementaryCredits: this.props.complementaryCredits,
    };
  }
  private static validate(props: Omit<CourseProps, "id">) {
    if (!props.name || props.name.trim().length === 0) {
      throw new Error("Nome do curso e obrigatorio");
    }

    if (props.requiredCredits < 0) {
      throw new Error("Numero de creditos obrigatorios invalido");
    }

    if (props.electiveCredits < 0) {
      throw new Error("Numero de creditos eletivos invalido");
    }

    if (props.complementaryCredits < 0) {
      throw new Error("Numero de creditos complementares invalido");
    }
  }
}
