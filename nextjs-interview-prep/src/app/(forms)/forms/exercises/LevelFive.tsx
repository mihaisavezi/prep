// components/forms/Level5OptimizedForm.jsx
"use client";

import { useReducer, useContext, createContext } from "react";

const FormContext = createContext();

function formReducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      // TODO: Update a field in a specific section
      // COMPLETE THIS - return new state with updated field
      return {
        // YOUR LOGIC HERE
      };
    case "ADD_ITEM":
      // TODO: Add a new item to an array section
      // COMPLETE THIS - add item with unique id and defaults
      let { section, defaults } = action;

      return {
        // YOUR LOGIC HERE
        ...state,
        [section]: [...state[section], { id: Date.now(), ...action.defaults }],
      };
    case "REMOVE_ITEM":
      // TODO: Remove item from array section by id
      // COMPLETE THIS - filter out the item with matching id
      if(state[action.section].length == 0) return state

      let { id } = action;

      return {
        // YOUR LOGIC HERE
        ...state,
        [action.section]: state[action.section].filter(item => item.id !== id)
      }

      return {
        // YOUR LOGIC HERE
      };
    case "UPDATE_ITEM":
      // TODO: Update a specific field in an array item
      // COMPLETE THIS - map through array and update matching item
      let { field, value } = action;

      return {
        ...state,
        [action.section]: state[action.section].map(item => 
          item.id === action.id ? { ...item, [field]: value } : item
        )
        // YOUR LOGIC HERE
      };
    default:
      return state;
  }
}

function FormField({ section, field, label, type = "text", ...props }) {
  const { state, dispatch } = useContext(FormContext);

  const handleChange = (e) => {
    // TODO: Dispatch UPDATE_FIELD action
    // COMPLETE THIS - get value based on input type and dispatch
    const value = // YOUR LOGIC HERE
      dispatch({
        // YOUR DISPATCH OBJECT HERE
      });
  };

  return (
    <div className="mb-4">
      <label className="block mb-1">{label}:</label>
      {/* TODO: Complete the input rendering based on type */}
      {/* Handle textarea, checkbox, and regular input types */}
      {
        type === "textarea" ? <textarea value={state[section][field]} onChange={handleChange} {...props} className="w-full p-2 border rounded min-h-[100px]"></textarea> 
        : type === "checkbox" ? <input type="checkbox" checked={state[section][field]} onChange={handleChange} className="mr-2" /> :
        <input type={type} value={state[section][field]} onChange={handleChange} {...props} className="w-full p-2 border rounded" />
      }
    </div>
  );
}

function ExperienceItem({ item, section }) {
  const { dispatch } = useContext(FormContext);
  

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_ITEM",
      section,
      id: item.id,
      field: e.target.name,
      value: e.target.value
      // YOUR DISPATCH OBJECT HERE
    });
  };

  const removeItem = () => {
    dispatch({
      type: "REMOVE_ITEM",
      section,
      id: item.id,
    });
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={removeItem}
        className="bg-red-500 text-white px-2 py-1 rounded text-sm"
      >
        Remove
      </button>
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

  const addExperience = () => {
    dispatch({
      type: "ADD_ITEM",
      section: "experience",
      defaults: {
        company: "",
        position: "",
        years: 0,
      },
    })
  }

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-xl font-bold">Level 5: Optimized Large Form</h2>

        <fieldset className="border p-4 rounded">
          <legend className="font-semibold">Personal Information</legend>
          <FormField section="personal" field="name" label="Full Name" />
          <FormField section="personal" field="email" label="Email" />
          <FormField
            type="textarea"
            section="personal"
            field="bio"
            label="Bio"
          />
          {/* TODO: Use FormField components for name, email, and bio */}
        </fieldset>

        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Experience:</h3>
          <button
            type="button"
            onClick={addExperience}
            className="bg-green-500 text-white px-2 py-1 rounded text-sm"
          >
            Add Experience
          </button>

        </div>
        
          {state.experience.length > 0 && state.experience.map((item, index) => (
            <ExperienceItem item={item} section="experience" />
          ))}

        {/* TODO: Add experience section with add/remove functionality */}
        {/* TODO: Add education section with add/remove functionality */}

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
