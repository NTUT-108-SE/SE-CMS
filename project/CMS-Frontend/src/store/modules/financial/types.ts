export interface Financial {
  id: number;
  date: String;
  patientId: number;
  name: String;
  identifier: String;
  text: String;
}

export interface FinancialState {
  financial?: Financial;
  error: Boolean;
}
