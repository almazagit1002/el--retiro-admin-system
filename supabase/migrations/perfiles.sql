-- First, create the type if it doesn't exist
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tipo_empleado') THEN
    CREATE TYPE tipo_empleado AS ENUM ('super_admin', 'admin', 'employee');
  END IF;
END $$;

-- Create the table first
CREATE TABLE IF NOT EXISTS perfiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  telefono varchar NOT NULL,
  correo varchar NOT NULL UNIQUE,
  nombre_completo varchar NOT NULL,
  tipo_empleado tipo_empleado NOT NULL,
  fecha_creacion timestamptz DEFAULT now(),
  fecha_actualizacion timestamptz DEFAULT now(),
  CONSTRAINT fk_user
    FOREIGN KEY (id)
    REFERENCES auth.users (id)
    ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_perfiles_correo ON perfiles(correo);
CREATE INDEX IF NOT EXISTS idx_perfiles_tipo_empleado ON perfiles(tipo_empleado);

-- Enable Row Level Security
ALTER TABLE perfiles ENABLE ROW LEVEL SECURITY;

-- Enable realtime
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE perfiles;
  END IF;
END $$;

-- Now create the policies after the table exists
CREATE POLICY "super_admin_acceso_completo" ON perfiles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM perfiles
      WHERE perfiles.id = auth.uid()
      AND perfiles.tipo_empleado = 'super_admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM perfiles
      WHERE perfiles.id = auth.uid()
      AND perfiles.tipo_empleado = 'super_admin'
    )
  );

CREATE POLICY "admin_lectura_completa" ON perfiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM perfiles
      WHERE perfiles.id = auth.uid()
      AND perfiles.tipo_empleado = 'admin'
    )
  );

CREATE POLICY "admin_crear_empleados" ON perfiles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM perfiles
      WHERE perfiles.id = auth.uid()
      AND perfiles.tipo_empleado = 'admin'
    )
    AND (tipo_empleado)::text = 'employee'
  );

CREATE POLICY "empleados_lectura" ON perfiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM perfiles
      WHERE perfiles.id = auth.uid()
      AND perfiles.tipo_empleado = 'employee'
    )
  );

-- Create function and trigger for auto-updating fecha_actualizacion
CREATE OR REPLACE FUNCTION actualizar_fecha_actualizacion()
RETURNS TRIGGER AS $$
BEGIN
  NEW.fecha_actualizacion = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER actualizar_perfiles_fecha_actualizacion
  BEFORE UPDATE ON perfiles
  FOR EACH ROW
  EXECUTE FUNCTION actualizar_fecha_actualizacion();
