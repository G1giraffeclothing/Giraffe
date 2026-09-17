import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export async function storeProductImage(file: File) {
  const provider = process.env.IMAGE_STORAGE_PROVIDER ?? "local";
  if (provider !== "local") throw new Error(`${provider} storage adapter is not configured yet`);
  if (!file.type.startsWith("image/")) throw new Error("Only image uploads are allowed");
  if (file.size > 10 * 1024 * 1024) throw new Error("Image must be smaller than 10MB");
  const extension = file.type.split("/")[1]?.replace("jpeg", "jpg") ?? "bin";
  const filename = `${crypto.randomUUID()}.${extension}`;
  const directory = path.join(process.cwd(), "public", "uploads", "products");
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, filename), Buffer.from(await file.arrayBuffer()));
  return `/uploads/products/${filename}`;
}
