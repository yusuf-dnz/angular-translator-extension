export class TranslatorConfig {
  public id: string;
  public description: string;
  public from: string;
  public to: string;

  constructor(from: string, to: string) {
    this.id = `${from}-${to}`
    this.description = TranslatorConfig.createDescription(from, to);
    this.from = from;
    this.to = to;
  }

  private static createDescription(a: string, b: string): string {
    const x = JSON.parse(localStorage.getItem('languages') || '');
    const y = `${x[a]?.name ?? 'Auto'} -> ${x[b].name}`;
    return y;
  }
}
