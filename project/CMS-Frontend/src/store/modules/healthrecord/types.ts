export interface HealthRecord {
  id: number;
  patientId: number;
  code: String;
  medication: String;
  date: String;
  identifier: String;
  name: String;
}

export interface HealthRecordState {
  healthrecord?: HealthRecord;
  error: Boolean;
}
