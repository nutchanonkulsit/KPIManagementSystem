export interface Kpi {
  id?: number;
  title: string;
  description?: string | undefined;
  target_value?: number;
  actual_value?: number;
  status: 'On Track' | 'At Risk' | 'Off Track' | null; 
  assigned_user?: number;
  start_date?: string;
  end_date?: string;
}
