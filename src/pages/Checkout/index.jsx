import React, { useState, useRef } from 'react';
import '../../App.css'
import { Modal, Button, ConfigProvider } from 'antd';

const selections = [
  {
    title: "Select Your Drink",
    options: ["Black Soft Drink", "White Soft Drink"],
  },
  {
    title: "Select Your Dessert",
    options: ["Thin Crust", "Thick Crust", "Stuffed Crust", "Gluten-Free Crust", "Cheese Burst"],
  },
  {
    title: "Select Your Flavor",
    options: ["Thin Crust", "Thick Crust", "Stuffed Crust", "Gluten-Free Crust", "Cheese Burst"],
  },
  {
    title: "Select Your Crust",
    options: ["Thin Crust", "Thick Crust", "Stuffed Crust", "Gluten-Free Crust", "Cheese Burst"],
  },
];

const SelectionModal = ({ visible, onClose }) => {
  const [selectionsState, setSelectionsState] = useState(Array(selections.length).fill(null));
  const sectionRefs = useRef([]);

  const handleSelectionChange = (index, value) => {
    const newSelections = [...selectionsState];
    newSelections[index] = value;
    console.log('checking what goes into newSelection ', newSelections)
    setSelectionsState(newSelections);

    // Check if all selections are made
    if (newSelections[index] && index < selections.length - 1) {
      // Automatically scroll to the next selection
      sectionRefs.current[index + 1]?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
 
    <Modal title="Your Order Selections" visible={visible} onCancel={onClose} footer={null} className='rounded-3xl'>
      <div style={{ maxHeight: '30vh', overflowY: 'auto' }}>
        {selections.map((selection, index) => (
          <div key={index} ref={(el) => (sectionRefs.current[index] = el)} style={{ marginBottom: '20px' }}>
            <h3>{selection.title}</h3>
            {selection.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <label>
                  <input
                    type="radio"
                    name={`selection-${index}`}
                    value={option}
                    onChange={() => handleSelectionChange(index, option)}
                    checked={selectionsState[index] === option}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>
      <Button type="primary" onClick={onClose}>
        Confirm Selection
      </Button>
    </Modal>

  );
};

const Checkout = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div>
      <Button onClick={() => setModalVisible(true)}>Open Selection Modal</Button>
      <SelectionModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </div>
  );
};

export default Checkout;
