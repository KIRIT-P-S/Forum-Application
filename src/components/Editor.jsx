import { useState } from "react";

export default function Editor() {
  const [code, setCode] = useState("// write your code...");

  return (
    <div className="p-4 h-full flex flex-col">
      <h2 className="text-xl font-bold mb-3">Code Editor</h2>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="flex-1 border p-3 rounded font-mono text-sm"
      ></textarea>
    </div>
  );
}
