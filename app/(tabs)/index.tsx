import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';

type UserFormData = {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  employeeType: 'super_admin' | 'admin' | 'employee';
};

type FormErrors = {
  email?: string;
  password?: string;
  fullName?: string;
  phone?: string;
  employeeType?: string;
  general?: string;
};

const EMPLOYEE_TYPES = [
  { label: 'Super Administrador', value: 'super_admin', icon: 'star' },
  { label: 'Administrador', value: 'admin', icon: 'shield' },
  { label: 'Empleado', value: 'employee', icon: 'person' },
] as const;

export default function UserManagementScreen() {
  const [formData, setFormData] = useState<UserFormData>({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    employeeType: 'employee',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Correo electrónico inválido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!formData.fullName) {
      newErrors.fullName = 'El nombre completo es requerido';
    }

    if (!formData.phone) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^\d{8}$/.test(formData.phone)) {
      newErrors.phone = 'El teléfono debe tener 8 dígitos';
    }

    if (!formData.employeeType) {
      newErrors.employeeType = 'El tipo de empleado es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateUser = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});
    setSuccess(false);

    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: formData.email,
        password: formData.password,
        email_confirm: true,
      });

      if (authError) throw authError;

      if (!authData.user) throw new Error('No se pudo crear el usuario');

      // Create profile
      const { error: profileError } = await supabase
        .from('perfiles')
        .insert({
          id: authData.user.id,
          correo: formData.email,
          nombre_completo: formData.fullName,
          telefono: formData.phone,
          tipo_empleado: formData.employeeType,
        });

      if (profileError) throw profileError;

      setSuccess(true);
      setFormData({
        email: '',
        password: '',
        fullName: '',
        phone: '',
        employeeType: 'employee',
      });
    } catch (error: any) {
      setErrors({
        general: error.message || 'Ocurrió un error al crear el usuario',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Text style={styles.title}>Gestión de Usuarios</Text>
        <Text style={styles.subtitle}>Crear nuevo usuario</Text>
      </View>

      {errors.general && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errors.general}</Text>
        </View>
      )}

      {success && (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>
            Usuario creado exitosamente
          </Text>
        </View>
      )}

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Correo Electrónico</Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            value={formData.email}
            onChangeText={(text) => {
              setFormData((prev) => ({ ...prev, email: text }));
              setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            placeholder="ejemplo@correo.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            value={formData.password}
            onChangeText={(text) => {
              setFormData((prev) => ({ ...prev, password: text }));
              setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            placeholder="Mínimo 6 caracteres"
            secureTextEntry
          />
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre Completo</Text>
          <TextInput
            style={[styles.input, errors.fullName && styles.inputError]}
            value={formData.fullName}
            onChangeText={(text) => {
              setFormData((prev) => ({ ...prev, fullName: text }));
              setErrors((prev) => ({ ...prev, fullName: undefined }));
            }}
            placeholder="Nombre y Apellidos"
          />
          {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            style={[styles.input, errors.phone && styles.inputError]}
            value={formData.phone}
            onChangeText={(text) => {
              setFormData((prev) => ({ ...prev, phone: text }));
              setErrors((prev) => ({ ...prev, phone: undefined }));
            }}
            placeholder="8 dígitos"
            keyboardType="numeric"
            maxLength={8}
          />
          {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tipo de Empleado</Text>
          <View style={[styles.pickerContainer, errors.employeeType && styles.inputError]}>
            <Picker
              selectedValue={formData.employeeType}
              onValueChange={(value) => {
                setFormData((prev) => ({ ...prev, employeeType: value }));
                setErrors((prev) => ({ ...prev, employeeType: undefined }));
              }}
              style={styles.picker}
              itemStyle={styles.pickerItem}>
              {EMPLOYEE_TYPES.map((type) => (
                <Picker.Item
                  key={type.value}
                  label={type.label}
                  value={type.value}
                  color={formData.employeeType === type.value ? '#8B4513' : '#333'}
                />
              ))}
            </Picker>
          </View>
          {errors.employeeType && <Text style={styles.errorText}>{errors.employeeType}</Text>}
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleCreateUser}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="person-add" size={20} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Crear Usuario</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    backgroundColor: '#8B4513',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    marginTop: 5,
  },
  form: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: Platform.OS === 'ios' ? 180 : 50,
    width: '100%',
  },
  pickerItem: {
    fontSize: 16,
    height: 120,
  },
  inputError: {
    borderColor: '#ff4444',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    margin: 20,
    borderRadius: 8,
  },
  successContainer: {
    backgroundColor: '#e8f5e9',
    padding: 12,
    margin: 20,
    borderRadius: 8,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: 4,
  },
  successText: {
    color: '#2e7d32',
    fontSize: 14,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#8B4513',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});