export interface Patient {
  address: String;
  birthDate: String;
  family: String;
  gender: String;
  given: String;
  id: number;
  identifier: String;
  maritalStatus: String;
  phone: String;
}

export interface PatientState {
  patient?: Patient;
  isEmpty: Boolean;
}
