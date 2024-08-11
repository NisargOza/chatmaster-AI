"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

const NextBreadcrumbs = () => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/chatbot") {
      router.push("/");
    }
  }, [pathname, router]);

  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  const segments = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    return { href, label };
  });

  // Filter out Chatbot and Training from breadcrumbs
  const breadcrumbs = segments.filter(
    (breadcrumb) =>
      breadcrumb.label !== "Chatbot" && breadcrumb.label !== "Training"
  );

  breadcrumbs.unshift({ href: "/", label: "Home" });

  return (
    <nav className="flex bg-slate-300 p-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.href} className="inline-flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400" />}
            <Link
              href={crumb.href}
              className={`ml-1 text-sm font-medium ${
                index === breadcrumbs.length - 1
                  ? "text-gray-500 hover:text-gray-700"
                  : "text-blue-600 hover:text-blue-800"
              }`}
            >
              {crumb.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default NextBreadcrumbs;
