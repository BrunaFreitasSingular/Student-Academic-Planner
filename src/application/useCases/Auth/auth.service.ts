import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from "../../../infrastructure/database/prismaClient.ts"

export type AuthDTO = {
  token: string
  user: {
    id:     string
    email:  string
    student: {
      name:     string
      course_id:   number
      semester: number
    } | null
  }
}

export async function loginService(
  email:    string,
  password: string
): Promise<AuthDTO> {

  const record = await prisma.user.findUnique({
    where: { email },
    include: { student: true }
  })

  if (!record || !record.is_active) {
    throw new Error('Credenciais inválidas')
  }

  // 2. compara senha com hash
  const valid = await bcrypt.compare(password, record.password_hash)
  if (!valid) {
    throw new Error('Credenciais inválidas')  // mesma msg — não revela qual campo errou
  }

  // 3. gera JWT
  const token = jwt.sign(
    { userId: record.id },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  )

  return {
    token,
    user: {
      id:    record.id,
      email: record.email,
      student: record.student ? {
        name:     record.student.name,
        course_id:   record.student.course_id,
        semester: record.student.semester
      } : null
    }
  }
}