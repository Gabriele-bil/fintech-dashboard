export interface NomeECodice {
  nome: string;
  codice: string;
}

export interface Comune {
  nome: string;
  codice: string;
  zona: NomeECodice;
  regione: NomeECodice;
  provincia: NomeECodice;
  sigla: string;
  codiceCatastale: string;
  cap: string[];
  popolazione: number;
}
