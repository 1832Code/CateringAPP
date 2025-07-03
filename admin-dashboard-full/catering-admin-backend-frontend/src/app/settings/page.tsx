
import { Metadata } from "next";
import SettingsClient from "./SettingsClient";

export const metadata: Metadata = {
  title: "Settings",
  description:
    "Seccion de configuracion Admin del Dashboard",
};

export default function SettingsPage(){
  return <SettingsClient/>
}
