import { UserRepository } from "../../../domain/repositories/users.repository.ts";
import { CreateUserDTO } from "../../dtos/UserDTO.ts";
import { User } from "../../../domain/entities/User.ts"

export class CreateUserUseCase{
    constructor(private userRepository: UserRepository){}

    async execute(data: CreateUserDTO): Promise<User>{
        const user = User.create({
            name: data.name,
            course_id: data.course_id,
            semester: data.semester
        });
        return await this.userRepository.create(user);
    }
}
