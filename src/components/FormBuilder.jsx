import { useState } from "react";

export default function FormBuilder() {
  const [fields, setFields] = useState([]);
  const addField = (type) => setFields([...fields, { id: Date.now(), type }]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">Form Builder</h2>

      <div className="flex gap-2 mb-4">
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded"
          onClick={() => addField("text")}
        >
          Add Text
        </button>
        <button
          className="px-3 py-1 bg-green-500 text-white rounded"
          onClick={() => addField("number")}
        >
          Add Number
        </button>
        <button
          className="px-3 py-1 bg-purple-500 text-white rounded"
          onClick={() => addField("email")}
        >
          Add Email
        </button>
      </div>

      <div className="space-y-3">
        {fields.map((f) => (
          <div key={f.id} className="p-3 border rounded">
            <label className="block font-medium">{f.type} field</label>
            <input
              type={f.type}
              className="w-full border px-2 py-1 mt-1 rounded"
              placeholder={`Enter ${f.type}...`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
