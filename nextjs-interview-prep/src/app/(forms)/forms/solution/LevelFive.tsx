// components/forms/Level5OptimizedForm.jsx
"use client";

import { useReducer, useContext, createContext } from "react";

// Form context for deep nesting
const FormContext = createContext();

// Reducer function for complex state management
function formReducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.section]: {
          ...state[action.section],
          [action.field]: action.value,
        },
      };
    case "ADD_ITEM":
      return {
        ...state,
        [action.section]: [
          ...state[action.section],
          { id: Date.now(), ...action.defaults },
        ],
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        [action.section]: state[action.section].filter(
          (item) => item.id !== action.id
        ),
      };
    case "UPDATE_ITEM":
      return {
        ...state,
        [action.section]: state[action.section].map((item) =>
          item.id === action.id
            ? { ...item, [action.field]: action.value }
            : item
        ),
      };
    default:
      return state;
  }
}

// Field component optimized with context
function FormField({ section, field, label, type = "text", ...props }) {
  const { state, dispatch } = useContext(FormContext);

  const handleChange = (e) => {
    const value = type === "checkbox" ? e.target.checked : e.target.value;
    dispatch({
      type: "UPDATE_FIELD",
      section,
      field,
      value,
    });
  };

  return (
    <div className="mb-4">
      <label className="block mb-1">{label}:</label>
      {type === "textarea" ? (
        <textarea
          value={state[section][field]}
          onChange={handleChange}
          className="w-full p-2 border rounded min-h-[100px]"
          {...props}
        />
      ) : type === "checkbox" ? (
        <input
          type="checkbox"
          checked={state[section][field]}
          onChange={handleChange}
          className="mr-2"
          {...props}
        />
      ) : (
        <input
          type={type}
          value={state[section][field]}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          {...props}
        />
      )}
    </div>
  );
}

// Dynamic list component
function DynamicList({ section, itemComponent: ItemComponent, defaults }) {
  const { state, dispatch } = useContext(FormContext);
  const items = state[section] || [];

  return (
    <div className="border-t pt-4 mt-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold capitalize">{section}</h3>
        <button
          type="button"
          onClick={() => dispatch({ type: "ADD_ITEM", section, defaults })}
          className="bg-green-500 text-white px-3 py-1 rounded text-sm"
        >
          Add
        </button>
      </div>

      {items.map((item) => (
        <div key={item.id} className="border p-3 rounded mb-3 relative">
          <button
            type="button"
            onClick={() =>
              dispatch({ type: "REMOVE_ITEM", section, id: item.id })
            }
            className="absolute top-2 right-2 text-red-500"
          >
            ×
          </button>
          <ItemComponent item={item} section={section} />
        </div>
      ))}
    </div>
  );
}

// Experience item component
function ExperienceItem({ item, section }) {
  const { dispatch } = useContext(FormContext);

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_ITEM",
      section,
      id: item.id,
      field: e.target.name,
      value: e.target.value,
    });
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="block mb-1 text-sm">Company</label>
        <input
          type="text"
          name="company"
          value={item.company}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block mb-1 text-sm">Position</label>
          <input
            type="text"
            name="position"
            value={item.position}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Years</label>
          <input
            type="number"
            name="years"
            min="0"
            value={item.years}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
    </div>
  );
}

export default function Level5OptimizedForm() {
  const [state, dispatch] = useReducer(formReducer, {
    personal: {
      name: "",
      email: "",
      bio: "",
    },
    experience: [],
    education: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Resume submitted:", state);
  };

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-xl font-bold">Level 5: Optimized Large Form</h2>

        <fieldset className="border p-4 rounded">
          <legend className="font-semibold">Personal Information</legend>
          <FormField section="personal" field="name" label="Full Name" />
          <FormField
            section="personal"
            field="email"
            label="Email"
            type="email"
          />
          <FormField
            section="personal"
            field="bio"
            label="Bio"
            type="textarea"
          />
        </fieldset>

        <DynamicList
          section="experience"
          itemComponent={ExperienceItem}
          defaults={{ company: "", position: "", years: 0 }}
        />

        <DynamicList
          section="education"
          itemComponent={({ item, section }) => {
            const { dispatch } = useContext(FormContext);

            const handleChange = (e) => {
              dispatch({
                type: "UPDATE_ITEM",
                section,
                id: item.id,
                field: e.target.name,
                value: e.target.value,
              });
            };

            return (
              <div className="space-y-3">
                <div>
                  <label className="block mb-1 text-sm">Institution</label>
                  <input
                    type="text"
                    name="institution"
                    value={item.institution}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-1 text-sm">Degree</label>
                    <input
                      type="text"
                      name="degree"
                      value={item.degree}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm">Year</label>
                    <input
                      type="number"
                      name="year"
                      min="1900"
                      max="2099"
                      value={item.year}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
              </div>
            );
          }}
          defaults={{ institution: "", degree: "", year: "" }}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Resume
        </button>
      </form>
    </FormContext.Provider>
  );
}
