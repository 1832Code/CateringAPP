
import { Metadata } from "next";
import SettingProfile from "./SettingProfile";

export const metadata: Metadata = {
  title: "Profile",
  description:
    "Perfil del Administrador - Dashboard",
};

export default function SettingsPage(){
  return <SettingProfile/>
}
