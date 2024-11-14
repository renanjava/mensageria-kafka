import * as bcrypt from 'bcrypt';

export class Password {
  public static async generateEncrypted(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  public static async verify(
    password: string,
    encrypted: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, encrypted);
  }
}
