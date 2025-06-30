// app/contacts/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/Komponenten /Header/Header";
import NavBar from "@/Komponenten /navBar/NavBar";

interface Contact {
  name: string;
  email: string;
  phone: string;
  color: string;
  id: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    // TODO: replace with actual fetch
    setContacts([
      {
        name: "Alice Smith",
        email: "alice@example.com",
        phone: "12345",
        color: "#3380FF",
        id: "1",
      },
      {
        name: "Bob Jones",
        email: "bob@example.com",
        phone: "67890",
        color: "#FF5733",
        id: "2",
      },
    ]);
  }, []);

  const grouped = contacts.reduce((acc, c) => {
    const letter = c.name[0].toUpperCase();
    acc[letter] = acc[letter] || [];
    acc[letter].push(c);
    return acc;
  }, {} as Record<string, Contact[]>);

  return (
    <div className="flex">
      <NavBar />
      <div className="flex-1 ml-[232px]">
        <Header />
        <div className="flex h-[calc(100vh-96px)]">
          {/* Left side */}
          <div className="w-[456px] bg-white shadow flex flex-col pt-28">
            <button
              onClick={() => setShowDialog(true)}
              className="w-[352px] h-14 mx-auto bg-[#2A3647] text-white rounded-lg flex items-center justify-center gap-4 hover:bg-[#50ABE2] transition"
            >
              <span className="text-lg font-bold">Add new contact</span>
              <Image src="/person_add.png" width={32} height={32} alt="Add" />
            </button>
            <div className="mt-4 overflow-y-auto">
              {Object.keys(grouped)
                .sort()
                .map((letter) => (
                  <div key={letter} className="px-4">
                    <div className="text-xl font-bold py-2">{letter}</div>
                    <div className="border-b mb-2" />
                    {grouped[letter].map((c) => (
                      <div
                        key={c.id}
                        onClick={() => setSelected(c.id)}
                        className={`w-[352px] py-4 px-6 flex items-center gap-4 cursor-pointer rounded ${
                          selected === c.id
                            ? "bg-[#2A3647] text-white"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                          style={{ backgroundColor: c.color }}
                        >
                          {c.name
                            .split(" ")
                            .map((w) => w[0])
                            .join("")}
                        </div>
                        <div className="flex flex-col">
                          <p className="text-lg">{c.name}</p>
                          <p className="text-blue-600">{c.email}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </div>

          {/* Right side */}
          <div className="flex-1 p-8">
            {!selected ? (
              <h1 className="text-4xl font-bold">Select a contact</h1>
            ) : (
              (() => {
                const c = contacts.find((x) => x.id === selected)!;
                const initials = c.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("");
                return (
                  <div className="max-w-md">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-24 h-24 rounded-full flex items-center justify-center text-white text-4xl font-medium"
                        style={{ backgroundColor: c.color }}
                      >
                        {initials}
                      </div>
                      <div className="flex-1 flex justify-end gap-4">
                        <button className="text-blue-600 hover:text-blue-800">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="mt-8 space-y-4">
                      <p className="text-xl font-semibold">
                        Contact Information
                      </p>
                      <p>
                        <span className="font-medium">Email:</span> {c.email}
                      </p>
                      <p>
                        <span className="font-medium">Phone:</span> {c.phone}
                      </p>
                    </div>
                  </div>
                );
              })()
            )}
          </div>
        </div>
      </div>

      {/* Add dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl flex overflow-hidden w-[75%] max-w-[1200px]">
            <div className="bg-[#2A3647] p-16 flex flex-col items-center justify-center space-y-4 text-white w-[400px]">
              <Image src="/joinlogo.png" width={54} height={66} alt="logo" />
              <h1 className="text-4xl font-bold">Add contact</h1>
              <p className="text-xl">Tasks are better with a team!</p>
              <div className="h-1 bg-[#29ABE2] w-24 rounded" />
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: add contact
                setShowDialog(false);
              }}
              className="p-16 flex-1 space-y-8"
            >
              {["Name", "Email", "Phone"].map((label, i) => (
                <div
                  key={i}
                  className="flex items-center border rounded-lg p-4 gap-4"
                >
                  <input
                    type={
                      label === "Email"
                        ? "email"
                        : label === "Phone"
                        ? "tel"
                        : "text"
                    }
                    placeholder={label}
                    required
                    className="flex-1 bg-transparent outline-none text-lg"
                  />
                  <Image
                    src={`/${label.toLowerCase()}.png`}
                    width={24}
                    height={24}
                    alt={label}
                  />
                </div>
              ))}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowDialog(false)}
                  className="px-6 py-3 border rounded-lg text-[#2A3647] hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#2A3647] text-white rounded-lg hover:bg-[#50abe2]"
                >
                  Create contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
