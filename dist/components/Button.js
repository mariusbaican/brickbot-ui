import { jsx as _jsx } from "react/jsx-runtime";
export function Button({ primaryColor = "var(--primary)", secondaryColor = "var(--secondary)", className = "", style = {}, }) {
    return _jsx("div", { className: "bg-red-500 text-white p-4", children: "Tailwind is working!" });
}
