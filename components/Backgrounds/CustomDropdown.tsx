import React, { useState } from 'react';

type Background = {
  name: string;
  image: string;
};

const CustomDropdown = ({ onSelect }: { onSelect: (bg: string) => void }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  // Your backgrounds with images
  const backgrounds: Background[] = [
    { name: "NeuralLink", image: "neural-link-image.jpg" },
    { name: "StarVeil", image: "star-veil-image.jpg" },
    { name: "QuantumFade", image: "quantum-fade-image.jpg" },
  ];

  return (
    <div className="custom-dropdown">
      {/* Button that shows the selected option */}
      <div className="dropdown-btn">
        {selectedOption || "Customize Background"}
      </div>

      {/* Dropdown options with images */}
      <div className="dropdown-content">
        {backgrounds.map((bg) => (
          <div
            key={bg.name}
            className="option"
            onClick={() => {
              setSelectedOption(bg.name); // Set the selected option in state
              onSelect(bg.name); // Pass it to parent
            }}
          >
            {/* Show the image and background name */}
            <img src={bg.image} alt={bg.name} width="30" height="30" />
            {bg.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomDropdown;
