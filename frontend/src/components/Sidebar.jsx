import React from "react";

function Sidebar({activeTab, setActiveTab}) {
  const menuItems = [
    {
      name: "Products",
      key: "products",
    },
    {
      name: "Add Products",
      key: "add",
    },
    {
      name: "Orders",
      key: "orders",
    },
    {
      name: "Profile",
      key: "profile",
    },
  ];
  return (
    <div className="w-64 bg-white shadow-lg p-6 flex flex-col gap-4 h-screen">
      <h1 className="text-2xl font-bold mb-6 text-green-600">Farmer DashBoard</h1>
      {menuItems.map((item) => (
        <button key={item.key} onClick={() => setActiveTab(item.key)} className={`text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
            activeTab === item.key ? "bg-green-500 text-white" : "hover:bg-green-100"
          }`}>
            {item.name}
        </button>
      ))}
    </div>
  );
}

export default Sidebar;
