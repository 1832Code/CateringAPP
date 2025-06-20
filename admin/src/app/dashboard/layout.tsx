// app/(dashboard)/layout.tsx
import NavSlider from "./nav"; // Asegúrate de que el nombre coincida
import NavSuperior from "./navSuperior";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full ">
      <aside className="top-0 left-0 z-40  h-screen overflow-auto ">
        <NavSlider />
      </aside>
      <div className="flex-1 ml-64  w-[100%] h-autoflex flex-col">
        <div>
          <NavSuperior />
        </div>
        <div className=" flex-1 w-full h-auto flex flex-col  overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
