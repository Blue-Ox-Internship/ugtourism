declare module "multer" {
  export interface File {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
  }

  export function memoryStorage(): any;

  interface Options {
    storage?: any;
    limits?: { fileSize?: number };
  }

  interface Instance {
    single(field: string): (req: any, res: any, next: any) => void;
  }

  export default function multer(options?: Options): Instance;
}

declare global {
  namespace Express {
    interface Request {
      file?: multer.File;
    }
  }
}
