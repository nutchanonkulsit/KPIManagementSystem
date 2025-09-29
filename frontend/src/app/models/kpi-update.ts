export interface KpiUpdate {
  id?: number;
  kpi_id: number;
  updated_value: number;
  comment?: string | null;
  updated_by: number;
}
