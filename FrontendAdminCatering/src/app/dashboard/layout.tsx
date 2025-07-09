import NavSlider from "./nav";
import NavSuperior from "./navSuperior";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar - Oculto en móviles por defecto, controlado por el estado interno de NavSlider */}
      <div className=" fixed  z-40 w-[0%] h-screen transform -translate-x-full md:translate-x-0 transition-transform duration-300">
        <NavSlider />
      </div>

      {/* Contenido principal */}
      <div className="  flex-1 flex flex-col md:ml-64  w-full lg:w-full min-h-screen">
        {/* Navbar superior - Fijo en la parte superior */}
        <header className="sticky top-0 z-30 w-full">
          <NavSuperior />
        </header>

        {/* Contenido desplazable */}
        <main className="flex-1 p-2 md:p-6 overflow-y-auto ">{children}</main>
      </div>
    </div>
  );
}
