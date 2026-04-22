import { FastifyRequest, FastifyReply } from "fastify";
import { LoginUserDTO } from "../../application/dtos/Login.DTO.ts";

import { loginService } from "../../application/useCases/Auth/auth.service.ts";

export async function loginController(
  req: FastifyRequest<{ Body: LoginUserDTO }>,
  reply: FastifyReply,
) {
  try {
    const { email, password } = req.body
    const result = await loginService(email, password)
    return reply.status(200).send(result)
  } catch (err: any) {
    return reply.status(401).send({
      statusCode: 401,
      error:      'Unauthorized',
      message:    err.message,
    })
  }
}