"use client";

import React, { useState } from "react";
<<<<<<< HEAD
import {
  User,
  Shield,
  Bell,
  Settings as SettingsIcon,
=======
import { 
  User, 
  Shield, 
  Bell, 
  Settings as SettingsIcon, 
>>>>>>> origin/auth
  Save,
  Eye,
  EyeOff,
  Mail,
  Phone,
  MapPin,
  Building,
  Globe,
  Palette,
  Database,
<<<<<<< HEAD
  Key,
=======
  Key
>>>>>>> origin/auth
} from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: "Admin",
    lastName: "Catering",
    email: "admin@catering.com",
    phone: "+51 999 888 777",
    address: "Av. Principal 123",
    company: "Catering Services S.A.",
<<<<<<< HEAD
    website: "www.catering.com",
=======
    website: "www.catering.com"
>>>>>>> origin/auth
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorAuth: false,
<<<<<<< HEAD
    sessionTimeout: 30,
=======
    sessionTimeout: 30
>>>>>>> origin/auth
  });

  const [notificationData, setNotificationData] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    orderUpdates: true,
    systemAlerts: true,
<<<<<<< HEAD
    marketingEmails: false,
=======
    marketingEmails: false
>>>>>>> origin/auth
  });

  const [systemData, setSystemData] = useState({
    language: "es",
    timezone: "America/Lima",
    dateFormat: "DD/MM/YYYY",
    currency: "PEN",
    theme: "light",
    autoBackup: true,
<<<<<<< HEAD
    backupFrequency: "daily",
  });

  const handleProfileChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSecurityChange = (field, value) => {
    setSecurityData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field, value) => {
    setNotificationData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSystemChange = (field, value) => {
    setSystemData((prev) => ({ ...prev, [field]: value }));
=======
    backupFrequency: "daily"
  });

  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSecurityChange = (field, value) => {
    setSecurityData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field, value) => {
    setNotificationData(prev => ({ ...prev, [field]: value }));
  };

  const handleSystemChange = (field, value) => {
    setSystemData(prev => ({ ...prev, [field]: value }));
>>>>>>> origin/auth
  };

  const handleSave = (section) => {
    // Aquí iría la lógica para guardar los cambios
    console.log(`Guardando configuración de ${section}:`, {
      profile: profileData,
      security: securityData,
      notifications: notificationData,
<<<<<<< HEAD
      system: systemData,
    });

=======
      system: systemData
    });
    
>>>>>>> origin/auth
    // Simular guardado exitoso
    alert(`Configuración de ${section} guardada exitosamente`);
  };

  const tabs = [
    { id: "profile", label: "Perfil", icon: User },
    { id: "security", label: "Seguridad", icon: Shield },
    { id: "notifications", label: "Notificaciones", icon: Bell },
<<<<<<< HEAD
    { id: "system", label: "Sistema", icon: SettingsIcon },
=======
    { id: "system", label: "Sistema", icon: SettingsIcon }
>>>>>>> origin/auth
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-slate-800 dark:text-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
<<<<<<< HEAD
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Configuración
          </h1>
          <p className="text-gray-600">
            Gestiona la configuración de tu cuenta y sistema
          </p>
=======
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Configuración</h1>
          <p className="text-gray-600">Gestiona la configuración de tu cuenta y sistema</p>
>>>>>>> origin/auth
        </div>

        <div className="bg-white rounded-lg shadow-sm border dark:bg-slate-900">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
<<<<<<< HEAD
                  <h2 className="text-xl font-semibold text-gray-900">
                    Información del Perfil
                  </h2>
=======
                  <h2 className="text-xl font-semibold text-gray-900">Información del Perfil</h2>
>>>>>>> origin/auth
                  <button
                    onClick={() => handleSave("profile")}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar Cambios</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={profileData.firstName}
<<<<<<< HEAD
                      onChange={(e) =>
                        handleProfileChange("firstName", e.target.value)
                      }
=======
                      onChange={(e) => handleProfileChange("firstName", e.target.value)}
>>>>>>> origin/auth
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Apellido
                    </label>
                    <input
                      type="text"
                      value={profileData.lastName}
<<<<<<< HEAD
                      onChange={(e) =>
                        handleProfileChange("lastName", e.target.value)
                      }
=======
                      onChange={(e) => handleProfileChange("lastName", e.target.value)}
>>>>>>> origin/auth
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        value={profileData.email}
<<<<<<< HEAD
                        onChange={(e) =>
                          handleProfileChange("email", e.target.value)
                        }
=======
                        onChange={(e) => handleProfileChange("email", e.target.value)}
>>>>>>> origin/auth
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        value={profileData.phone}
<<<<<<< HEAD
                        onChange={(e) =>
                          handleProfileChange("phone", e.target.value)
                        }
=======
                        onChange={(e) => handleProfileChange("phone", e.target.value)}
>>>>>>> origin/auth
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dirección
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={profileData.address}
<<<<<<< HEAD
                        onChange={(e) =>
                          handleProfileChange("address", e.target.value)
                        }
=======
                        onChange={(e) => handleProfileChange("address", e.target.value)}
>>>>>>> origin/auth
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Empresa
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={profileData.company}
<<<<<<< HEAD
                        onChange={(e) =>
                          handleProfileChange("company", e.target.value)
                        }
=======
                        onChange={(e) => handleProfileChange("company", e.target.value)}
>>>>>>> origin/auth
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sitio Web
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="url"
                        value={profileData.website}
<<<<<<< HEAD
                        onChange={(e) =>
                          handleProfileChange("website", e.target.value)
                        }
=======
                        onChange={(e) => handleProfileChange("website", e.target.value)}
>>>>>>> origin/auth
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
<<<<<<< HEAD
                  <h2 className="text-xl font-semibold text-gray-900">
                    Configuración de Seguridad
                  </h2>
=======
                  <h2 className="text-xl font-semibold text-gray-900">Configuración de Seguridad</h2>
>>>>>>> origin/auth
                  <button
                    onClick={() => handleSave("security")}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar Cambios</span>
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contraseña Actual
                      </label>
                      <div className="relative">
                        <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={securityData.currentPassword}
<<<<<<< HEAD
                          onChange={(e) =>
                            handleSecurityChange(
                              "currentPassword",
                              e.target.value
                            )
                          }
=======
                          onChange={(e) => handleSecurityChange("currentPassword", e.target.value)}
>>>>>>> origin/auth
                          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
<<<<<<< HEAD
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
=======
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
>>>>>>> origin/auth
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nueva Contraseña
                      </label>
                      <div className="relative">
                        <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={securityData.newPassword}
<<<<<<< HEAD
                          onChange={(e) =>
                            handleSecurityChange("newPassword", e.target.value)
                          }
=======
                          onChange={(e) => handleSecurityChange("newPassword", e.target.value)}
>>>>>>> origin/auth
                          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
<<<<<<< HEAD
                          {showNewPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
=======
                          {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
>>>>>>> origin/auth
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirmar Nueva Contraseña
                    </label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={securityData.confirmPassword}
<<<<<<< HEAD
                        onChange={(e) =>
                          handleSecurityChange(
                            "confirmPassword",
                            e.target.value
                          )
                        }
=======
                        onChange={(e) => handleSecurityChange("confirmPassword", e.target.value)}
>>>>>>> origin/auth
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        type="button"
<<<<<<< HEAD
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
=======
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
>>>>>>> origin/auth
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
<<<<<<< HEAD
                      <h3 className="font-medium text-gray-900">
                        Autenticación de Dos Factores
                      </h3>
                      <p className="text-sm text-gray-600">
                        Añade una capa extra de seguridad a tu cuenta
                      </p>
=======
                      <h3 className="font-medium text-gray-900">Autenticación de Dos Factores</h3>
                      <p className="text-sm text-gray-600">Añade una capa extra de seguridad a tu cuenta</p>
>>>>>>> origin/auth
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={securityData.twoFactorAuth}
<<<<<<< HEAD
                        onChange={(e) =>
                          handleSecurityChange(
                            "twoFactorAuth",
                            e.target.checked
                          )
                        }
=======
                        onChange={(e) => handleSecurityChange("twoFactorAuth", e.target.checked)}
>>>>>>> origin/auth
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tiempo de Sesión (minutos)
                    </label>
                    <select
                      value={securityData.sessionTimeout}
<<<<<<< HEAD
                      onChange={(e) =>
                        handleSecurityChange(
                          "sessionTimeout",
                          parseInt(e.target.value)
                        )
                      }
=======
                      onChange={(e) => handleSecurityChange("sessionTimeout", parseInt(e.target.value))}
>>>>>>> origin/auth
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value={15}>15 minutos</option>
                      <option value={30}>30 minutos</option>
                      <option value={60}>1 hora</option>
                      <option value={120}>2 horas</option>
                      <option value={480}>8 horas</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
<<<<<<< HEAD
                  <h2 className="text-xl font-semibold text-gray-900">
                    Preferencias de Notificaciones
                  </h2>
=======
                  <h2 className="text-xl font-semibold text-gray-900">Preferencias de Notificaciones</h2>
>>>>>>> origin/auth
                  <button
                    onClick={() => handleSave("notifications")}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar Cambios</span>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
<<<<<<< HEAD
                      <h3 className="font-medium text-gray-900">
                        Notificaciones por Email
                      </h3>
                      <p className="text-sm text-gray-600">
                        Recibe actualizaciones importantes por correo
                        electrónico
                      </p>
=======
                      <h3 className="font-medium text-gray-900">Notificaciones por Email</h3>
                      <p className="text-sm text-gray-600">Recibe actualizaciones importantes por correo electrónico</p>
>>>>>>> origin/auth
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationData.emailNotifications}
<<<<<<< HEAD
                        onChange={(e) =>
                          handleNotificationChange(
                            "emailNotifications",
                            e.target.checked
                          )
                        }
=======
                        onChange={(e) => handleNotificationChange("emailNotifications", e.target.checked)}
>>>>>>> origin/auth
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
<<<<<<< HEAD
                      <h3 className="font-medium text-gray-900">
                        Notificaciones SMS
                      </h3>
                      <p className="text-sm text-gray-600">
                        Recibe alertas importantes por mensaje de texto
                      </p>
=======
                      <h3 className="font-medium text-gray-900">Notificaciones SMS</h3>
                      <p className="text-sm text-gray-600">Recibe alertas importantes por mensaje de texto</p>
>>>>>>> origin/auth
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationData.smsNotifications}
<<<<<<< HEAD
                        onChange={(e) =>
                          handleNotificationChange(
                            "smsNotifications",
                            e.target.checked
                          )
                        }
=======
                        onChange={(e) => handleNotificationChange("smsNotifications", e.target.checked)}
>>>>>>> origin/auth
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
<<<<<<< HEAD
                      <h3 className="font-medium text-gray-900">
                        Notificaciones Push
                      </h3>
                      <p className="text-sm text-gray-600">
                        Recibe notificaciones en tiempo real en el navegador
                      </p>
=======
                      <h3 className="font-medium text-gray-900">Notificaciones Push</h3>
                      <p className="text-sm text-gray-600">Recibe notificaciones en tiempo real en el navegador</p>
>>>>>>> origin/auth
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationData.pushNotifications}
<<<<<<< HEAD
                        onChange={(e) =>
                          handleNotificationChange(
                            "pushNotifications",
                            e.target.checked
                          )
                        }
=======
                        onChange={(e) => handleNotificationChange("pushNotifications", e.target.checked)}
>>>>>>> origin/auth
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
<<<<<<< HEAD
                      <h3 className="font-medium text-gray-900">
                        Actualizaciones de Pedidos
                      </h3>
                      <p className="text-sm text-gray-600">
                        Notificaciones sobre el estado de los pedidos
                      </p>
=======
                      <h3 className="font-medium text-gray-900">Actualizaciones de Pedidos</h3>
                      <p className="text-sm text-gray-600">Notificaciones sobre el estado de los pedidos</p>
>>>>>>> origin/auth
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationData.orderUpdates}
<<<<<<< HEAD
                        onChange={(e) =>
                          handleNotificationChange(
                            "orderUpdates",
                            e.target.checked
                          )
                        }
=======
                        onChange={(e) => handleNotificationChange("orderUpdates", e.target.checked)}
>>>>>>> origin/auth
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
<<<<<<< HEAD
                      <h3 className="font-medium text-gray-900">
                        Alertas del Sistema
                      </h3>
                      <p className="text-sm text-gray-600">
                        Notificaciones sobre mantenimiento y actualizaciones
                      </p>
=======
                      <h3 className="font-medium text-gray-900">Alertas del Sistema</h3>
                      <p className="text-sm text-gray-600">Notificaciones sobre mantenimiento y actualizaciones</p>
>>>>>>> origin/auth
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationData.systemAlerts}
<<<<<<< HEAD
                        onChange={(e) =>
                          handleNotificationChange(
                            "systemAlerts",
                            e.target.checked
                          )
                        }
=======
                        onChange={(e) => handleNotificationChange("systemAlerts", e.target.checked)}
>>>>>>> origin/auth
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
<<<<<<< HEAD
                      <h3 className="font-medium text-gray-900">
                        Emails de Marketing
                      </h3>
                      <p className="text-sm text-gray-600">
                        Recibe ofertas especiales y novedades
                      </p>
=======
                      <h3 className="font-medium text-gray-900">Emails de Marketing</h3>
                      <p className="text-sm text-gray-600">Recibe ofertas especiales y novedades</p>
>>>>>>> origin/auth
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationData.marketingEmails}
<<<<<<< HEAD
                        onChange={(e) =>
                          handleNotificationChange(
                            "marketingEmails",
                            e.target.checked
                          )
                        }
=======
                        onChange={(e) => handleNotificationChange("marketingEmails", e.target.checked)}
>>>>>>> origin/auth
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "system" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
<<<<<<< HEAD
                  <h2 className="text-xl font-semibold text-gray-900">
                    Configuración del Sistema
                  </h2>
=======
                  <h2 className="text-xl font-semibold text-gray-900">Configuración del Sistema</h2>
>>>>>>> origin/auth
                  <button
                    onClick={() => handleSave("system")}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar Cambios</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Idioma
                    </label>
                    <select
                      value={systemData.language}
<<<<<<< HEAD
                      onChange={(e) =>
                        handleSystemChange("language", e.target.value)
                      }
=======
                      onChange={(e) => handleSystemChange("language", e.target.value)}
>>>>>>> origin/auth
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="es">Español</option>
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Zona Horaria
                    </label>
                    <select
                      value={systemData.timezone}
<<<<<<< HEAD
                      onChange={(e) =>
                        handleSystemChange("timezone", e.target.value)
                      }
=======
                      onChange={(e) => handleSystemChange("timezone", e.target.value)}
>>>>>>> origin/auth
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="America/Lima">Lima (GMT-5)</option>
                      <option value="America/New_York">New York (GMT-5)</option>
                      <option value="Europe/Madrid">Madrid (GMT+1)</option>
                      <option value="Asia/Tokyo">Tokyo (GMT+9)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Formato de Fecha
                    </label>
                    <select
                      value={systemData.dateFormat}
<<<<<<< HEAD
                      onChange={(e) =>
                        handleSystemChange("dateFormat", e.target.value)
                      }
=======
                      onChange={(e) => handleSystemChange("dateFormat", e.target.value)}
>>>>>>> origin/auth
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Moneda
                    </label>
                    <select
                      value={systemData.currency}
<<<<<<< HEAD
                      onChange={(e) =>
                        handleSystemChange("currency", e.target.value)
                      }
=======
                      onChange={(e) => handleSystemChange("currency", e.target.value)}
>>>>>>> origin/auth
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="PEN">Soles (PEN)</option>
                      <option value="USD">Dólares (USD)</option>
                      <option value="EUR">Euros (EUR)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tema
                    </label>
                    <select
                      value={systemData.theme}
<<<<<<< HEAD
                      onChange={(e) =>
                        handleSystemChange("theme", e.target.value)
                      }
=======
                      onChange={(e) => handleSystemChange("theme", e.target.value)}
>>>>>>> origin/auth
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="light">Claro</option>
                      <option value="dark">Oscuro</option>
                      <option value="auto">Automático</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Frecuencia de Respaldo
                    </label>
                    <select
                      value={systemData.backupFrequency}
<<<<<<< HEAD
                      onChange={(e) =>
                        handleSystemChange("backupFrequency", e.target.value)
                      }
=======
                      onChange={(e) => handleSystemChange("backupFrequency", e.target.value)}
>>>>>>> origin/auth
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="daily">Diario</option>
                      <option value="weekly">Semanal</option>
                      <option value="monthly">Mensual</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
<<<<<<< HEAD
                    <h3 className="font-medium text-gray-900">
                      Respaldo Automático
                    </h3>
                    <p className="text-sm text-gray-600">
                      Realizar respaldos automáticos de la base de datos
                    </p>
=======
                    <h3 className="font-medium text-gray-900">Respaldo Automático</h3>
                    <p className="text-sm text-gray-600">Realizar respaldos automáticos de la base de datos</p>
>>>>>>> origin/auth
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={systemData.autoBackup}
<<<<<<< HEAD
                      onChange={(e) =>
                        handleSystemChange("autoBackup", e.target.checked)
                      }
=======
                      onChange={(e) => handleSystemChange("autoBackup", e.target.checked)}
>>>>>>> origin/auth
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
