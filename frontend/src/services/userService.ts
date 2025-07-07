export interface UsuarioInfo {
  id: number;
  dni: string;
  nombres: string;
  apellidos: string;
  telefono: string;
  email: string;
}

export const getUserInfo = async (): Promise<UsuarioInfo | null> => {
  try {
    const response = await fetch('http://localhost:8084/api/usuarios/me', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener información del usuario');
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user info:', error);
    return null;
  }
}; 