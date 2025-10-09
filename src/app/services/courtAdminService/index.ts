import { create } from "./create";
import { getAll } from "./getAll";
import { getById } from "./getById";
import { remove } from "./remove";
import { update } from "./update";
import { uploadFile } from "./uploadImage";

export const courtAdminService = {
  getAll,
  create,
  getById,
  update,
  remove,
  uploadFile,
};
