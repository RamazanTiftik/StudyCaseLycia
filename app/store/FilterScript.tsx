"use client";

import { useEffect } from "react";

export default function FilterScript() {
  useEffect(() => {
    const buttons = document.querySelectorAll("[data-filter]");
    const items = document.querySelectorAll("#product-grid > div");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.getAttribute("data-filter");

        buttons.forEach((b) =>
          b.classList.remove("bg-primary", "text-white")
        );
        btn.classList.add("bg-primary", "text-white");

        items.forEach((item) => {
          const category = item.getAttribute("data-category");

          if (filter === "all" || filter === category) {
            item.classList.remove("hidden");
          } else {
            item.classList.add("hidden");
          }
        });
      });
    });
  }, []);

  return null;
}
