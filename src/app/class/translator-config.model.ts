export class TranslatorConfig {
  public id: number;
  public description: string;
  public from: string;
  public to: string;

  constructor( from: string, to: string) {
    this.id = TranslatorConfig.generateId();
    this.description = TranslatorConfig.createDescription(from, to);
    this.from = from;
    this.to = to;
  }

  private static generateId(): number {
    return Date.now();
  }
  private static createDescription(a: string, b: string): string {
    const x = JSON.parse(localStorage.getItem('languages') || '');
    const y = `${x[a].name} -> ${x[b].name}`;
    return y;
  }
}
