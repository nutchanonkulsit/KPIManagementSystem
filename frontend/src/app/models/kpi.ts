export interface Kpi {
  id?: number;
  title: string;
  description?: string | undefined;
  target_value?: number | null;
  actual_value?: number | null;
  status: 'On Track' | 'At Risk' | 'Off Track' | null; 
  assigned_user?: number | null;
  assigned_username?: string | null;
  start_date?: string;
  end_date?: string;
}
