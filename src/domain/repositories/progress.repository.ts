import { Progress } from "../entities/Progress.js";

export interface ProgressRepository {
  create(progress: Progress): Promise<Progress>;
  findAll(): Promise<Progress[]>;
  findById(id: number): Promise<Progress | null>;
  update(progress: Progress): Promise<Progress>;
  deleteById(id: number): Promise<void>;
}