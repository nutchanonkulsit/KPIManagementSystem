export interface KpiUpdate {
  id?: number;
  kpi_id: number;
  updated_value: number | null;
  comment?: string | null;
  updated_by: number;
}
