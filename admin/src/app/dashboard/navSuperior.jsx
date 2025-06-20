"use client";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for logout redirection

export default function NavSuperior() {
  // Initialize admin state with a structure matching your backend response, or null
  const [admin, setAdmin] = useState(null);
  const [dark, setDark] = useState(false);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      const token = localStorage.getItem("token");

      // If no token, no point in fetching admin details
      if (!token) {
        setAdmin(null);
        return;
      }

      try {
        const res = await fetch("http://localhost:8080/api/auth/me-admin", {
          method: "GET", // Use GET method
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send the JWT token
          },
          // 'credentials: "include"' is not strictly needed for JWT in Authorization header,
          // but if your Spring Security is configured for session cookies + JWT, keep it.
          // Otherwise, it can be removed for simpler CORS if you're not managing session cookies.
          // Based on your previous CORS error, if you have `credentials: "include"` here,
          // your backend's CORS config *must* have `allowCredentials(true)`.
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setAdmin(data); // Set the fetched admin data
        } else if (res.status === 401 || res.status === 403) {
          // Token expired, invalid, or not an admin.
          // Clear token and redirect to login
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          localStorage.removeItem("userEmail");
          localStorage.removeItem("userRoles");
          setAdmin(null);
          router.push("/auth/login"); // Redirect to admin login page
        } else {
          setAdmin(null); // Clear admin on other errors
          console.error(
            "Failed to fetch admin details:",
            res.status,
            await res.text()
          );
        }
      } catch (error) {
        console.error("Error fetching admin details:", error);
        setAdmin(null); // Clear admin on network errors
      }
    };

    fetchAdminDetails();

    // Optionally, refetch details if token changes (though typically token doesn't change until relogin)
    // You could also set up an interval to periodically refresh data if needed, but not common for user info.
  }, []); // Empty dependency array means this runs once on mount

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRoles");
    setAdmin(null); // Clear admin state
    router.push("/auth/login"); // Redirect to login page
  };

  return (
    <Navbar
      fluid
      className="bg-gray-50 dark:bg-gray-900 border-b-2 border-gray-400"
      style={{ padding: "1rem" }}
    >
      <NavbarBrand href="/">
        {" "}
        {/* Changed to root or your dashboard */}
        <img
          src="/logo.svg"
          className="mr-3 w-auto h-6 sm:h-9 bg-gray-800 rounded-full"
          alt="Catering Gourmet Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Catering Gourmet
        </span>
      </NavbarBrand>
      <div className="flex md:order-2 items-center gap-4">
        <button
          onClick={() => setDark((prev) => !prev)}
          className="p-2 rounded-full border border-gray-400 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          title="Alternar modo oscuro"
        >
          {dark ? (
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
              <path
                d="M17.75 15.5A6.5 6.5 0 0 1 8.5 6.25 7 7 0 1 0 17.75 15.5Z"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="5"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          )}
        </button>
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" // You might want to use a dynamic image based on admin.avatarUrl
              rounded
              style={{
                width: "3rem",
                height: "3rem",
                backgroundColor: "transparent", // Corrected 'write' to 'transparent' if that was intended
              }}
            />
          }
        >
          <DropdownHeader
            style={{
              padding: "1rem",
              backgroundColor: "white", // Changed from 'write' to 'white'
              borderRadius: "0.5rem", // Changed from '1.5rem' for a more common look, adjust as needed
            }}
          >
            {admin ? (
              <>
                <span className="block text-sm">
                  {admin.firstName} {admin.lastName}{" "}
                  {/* Display first and last name */}
                </span>
                <span className="block truncate text-sm font-medium">
                  {admin.email}
                </span>
              </>
            ) : (
              <span className="block text-sm">Cargando...</span>
            )}
          </DropdownHeader>
          {admin && ( // Only show these items if admin data is loaded
            <>
              <DropdownItem
                style={{ padding: "1rem", backgroundColor: "#222831" }}
                className="text-gray-800"
              >
                <Link href="/dashboard/setting" className="text-gray-100">
                  Setting
                </Link>
              </DropdownItem>
              <DropdownItem
                style={{ padding: "1rem", backgroundColor: "#222831" }}
              >
                {" "}
                <Link href="/dashboard/perfil">Perfil</Link>
              </DropdownItem>
              <DropdownItem
                style={{
                  padding: "1rem",
                  backgroundColor: "#222831",
                  // 'hover' style should be applied in TailwindCSS classes or a separate CSS file for Flowbite-react components
                  // This inline style won't apply hover effects
                }}
              >
                <Link href="/auth/search" className="text-gray-100">
                  Por definir
                </Link>
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem
                style={{ padding: "1rem", backgroundColor: "#222831" }}
              >
                <button
                  onClick={handleLogout}
                  className="text-gray-100 w-full text-left"
                >
                  Cerrar Sesion
                </button>
              </DropdownItem>
            </>
          )}
        </Dropdown>
        <NavbarToggle />
      </div>
    </Navbar>
  );
}
