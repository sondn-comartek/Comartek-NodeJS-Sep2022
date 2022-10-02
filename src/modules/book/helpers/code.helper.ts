export class CodeHelper {
  static generate(): string {
    let code = '';
    const numberCharacters = '0123456789';
    const codeLength = 6;

    for (let i = 0; i < codeLength; i++) {
      code += numberCharacters.charAt(Math.floor(Math.random() * codeLength));
    }

    return code;
  }
}
