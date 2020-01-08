export interface Pill {
  id: number;
  name: String;
  synonym: String;
  ingredient: String;
  contraindication: String;
  dosage: String;
  patientCharacteristics: String;
}

export interface PillState {
  pill?: Pill;
  error: Boolean;
}
